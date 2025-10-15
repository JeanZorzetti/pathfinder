import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserData } from '../auth/decorators/current-user.decorator';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@CurrentUser() currentUser: CurrentUserData) {
    const user = await this.usersService.findById(currentUser.id);
    return {
      success: true,
      data: user,
    };
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update current user profile' })
  async updateProfile(
    @CurrentUser() currentUser: CurrentUserData,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(currentUser.id, updateUserDto);
    return {
      success: true,
      data: user,
    };
  }

  @Get('subscription')
  @ApiOperation({ summary: 'Get current user subscription status' })
  async getSubscription(@CurrentUser() currentUser: CurrentUserData) {
    const hasPremium = await this.usersService.hasPremiumAccess(currentUser.id);
    const user = await this.usersService.findById(currentUser.id);

    return {
      success: true,
      data: {
        status: user.subscriptionStatus,
        hasPremiumAccess: hasPremium,
        expiresAt: user.subscriptionExpiresAt,
      },
    };
  }
}
