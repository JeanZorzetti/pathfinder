import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

export interface JwtPayload {
  sub: string; // User ID
  email: string;
  subscriptionStatus: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    subscriptionStatus: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Validate user credentials
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      return null;
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const { password: _, ...result } = user;
    return result;
  }

  /**
   * Register new user
   */
  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create user
    const user = await this.usersService.create({
      email: registerDto.email,
      password: registerDto.password,
      fullName: registerDto.fullName,
    });

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Update last login
    await this.usersService.updateLastLogin(user.id);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        subscriptionStatus: user.subscriptionStatus,
      },
    };
  }

  /**
   * Login user
   */
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Update last login
    await this.usersService.updateLastLogin(user.id);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        subscriptionStatus: user.subscriptionStatus,
      },
    };
  }

  /**
   * Generate JWT tokens
   */
  async generateTokens(user: any): Promise<{ access_token: string; refresh_token: string }> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      subscriptionStatus: user.subscriptionStatus,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION', '30d'),
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  /**
   * Verify JWT token
   */
  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersService.findById(payload.sub);

      const newPayload: JwtPayload = {
        sub: user.id,
        email: user.email,
        subscriptionStatus: user.subscriptionStatus,
      };

      const access_token = await this.jwtService.signAsync(newPayload);

      return { access_token };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
