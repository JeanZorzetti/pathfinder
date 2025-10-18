# 🚀 SPRINT 7: SOCIAL & COMMUNITY - PLANO DE IMPLEMENTAÇÃO

**Objetivo:** Criar features sociais para aumentar engajamento, retenção e viral loop

**Duração Estimada:** 2 semanas
**Data de Início:** 17/10/2025
**Status:** 📝 Planejamento

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Fase 1: Perfil Público](#fase-1-perfil-público)
- [Fase 2: Sistema de Seguidores](#fase-2-sistema-de-seguidores)
- [Fase 3: Leaderboards](#fase-3-leaderboards)
- [Fase 4: Referral Program](#fase-4-referral-program)
- [Fase 5: Shared Results](#fase-5-shared-results)
- [Fase 6: Grupos por Tipo (Opcional)](#fase-6-grupos-por-tipo-opcional)
- [Testes](#testes)
- [Deploy](#deploy)
- [Métricas de Sucesso](#métricas-de-sucesso)

---

## 🎯 Visão Geral

O Sprint 7 adiciona camada social ao Pathfinder, transformando-o de uma experiência individual em uma comunidade engajada. Foco em viral loops, retenção e network effects.

### Objetivos Principais

1. ✅ **Perfis Públicos** - Identidade e showcase
2. ✅ **Sistema de Seguidores** - Network building
3. ✅ **Leaderboards** - Competição saudável
4. ✅ **Referral Program** - Growth orgânico
5. ✅ **Shared Results** - Viral loop externo
6. ⚠️ **Grupos por Tipo** - Comunidade (opcional para MVP)

### Prioridades

**Must-Have (MVP):**
- Perfil público básico
- Sistema de seguidores
- Leaderboard global de XP
- Referral program simples
- Shared results com OG tags

**Nice-to-Have (v2):**
- Feed de atividades
- Grupos por tipo MBTI
- Moderação automática
- Notificações em tempo real
- Posts com curtidas/comentários

---

## 🏗️ Arquitetura

### Backend - Novos Módulos

```
backend/src/modules/
├── social/                 # Novo módulo
│   ├── social.module.ts
│   ├── social.controller.ts
│   ├── social.service.ts
│   ├── entities/
│   │   ├── follow.entity.ts
│   │   ├── activity.entity.ts
│   │   └── share.entity.ts
│   └── dto/
│       ├── follow-user.dto.ts
│       └── get-followers.dto.ts
├── leaderboard/            # Novo módulo
│   ├── leaderboard.module.ts
│   ├── leaderboard.controller.ts
│   ├── leaderboard.service.ts
│   └── dto/
│       └── leaderboard-query.dto.ts
├── referrals/              # Novo módulo
│   ├── referrals.module.ts
│   ├── referrals.controller.ts
│   ├── referrals.service.ts
│   ├── entities/
│   │   └── referral.entity.ts
│   └── dto/
│       └── create-referral.dto.ts
└── groups/                 # Opcional (v2)
    ├── groups.module.ts
    ├── groups.controller.ts
    ├── groups.service.ts
    └── entities/
        ├── group.entity.ts
        └── group-post.entity.ts
```

### Frontend - Novas Páginas

```
frontend/src/pages/
├── Profile.tsx             # Perfil público (@username)
├── Leaderboard.tsx         # Rankings
├── Referrals.tsx           # Dashboard de indicações
└── Community.tsx           # Grupos (v2)

frontend/src/components/social/
├── ProfileCard.tsx
├── FollowButton.tsx
├── FollowersList.tsx
├── LeaderboardTable.tsx
├── ReferralStats.tsx
└── ShareButton.tsx
```

### Database - Novas Tabelas

```sql
-- Perfil Público (estender users)
ALTER TABLE users ADD COLUMN username VARCHAR(30) UNIQUE;
ALTER TABLE users ADD COLUMN bio TEXT;
ALTER TABLE users ADD COLUMN is_public BOOLEAN DEFAULT true;
ALTER TABLE users ADD COLUMN avatar_url VARCHAR(500);

-- Seguidores
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

CREATE INDEX idx_follows_follower ON follows(follower_id);
CREATE INDEX idx_follows_following ON follows(following_id);

-- Feed de Atividades
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL, -- 'level_up', 'achievement', 'test_completed'
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activities_user ON activities(user_id);
CREATE INDEX idx_activities_created ON activities(created_at DESC);

-- Referrals
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID NOT NULL REFERENCES users(id),
  referred_user_id UUID REFERENCES users(id),
  referral_code VARCHAR(20) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'rewarded'
  reward_claimed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE INDEX idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX idx_referrals_code ON referrals(referral_code);

-- Shares (tracking de compartilhamentos)
CREATE TABLE shares (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  share_type VARCHAR(50) NOT NULL, -- 'test_result', 'achievement', 'profile'
  platform VARCHAR(20), -- 'twitter', 'instagram', 'whatsapp', 'copy_link'
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_shares_user ON shares(user_id);

-- Grupos (Opcional - v2)
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mbti_type VARCHAR(4) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE group_memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

CREATE TABLE group_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 📦 Fase 1: Perfil Público (3 dias)

### Backend

#### 1.1. Atualizar User Entity

**Arquivo:** `backend/src/modules/users/entities/user.entity.ts`

```typescript
import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  // ... campos existentes ...

  @Column({ unique: true, nullable: true, length: 30 })
  @Index()
  username: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ name: 'is_public', default: true })
  isPublic: boolean;

  @Column({ name: 'avatar_url', nullable: true, length: 500 })
  avatarUrl: string;

  @Column({ name: 'follower_count', default: 0 })
  followerCount: number;

  @Column({ name: 'following_count', default: 0 })
  followingCount: number;
}
```

#### 1.2. Criar Migration

```bash
npm run typeorm migration:create -- backend/src/database/migrations/AddUserPublicProfile
```

**Arquivo:** `backend/src/database/migrations/TIMESTAMP-AddUserPublicProfile.ts`

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserPublicProfile1234567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users
      ADD COLUMN username VARCHAR(30) UNIQUE,
      ADD COLUMN bio TEXT,
      ADD COLUMN is_public BOOLEAN DEFAULT true,
      ADD COLUMN avatar_url VARCHAR(500),
      ADD COLUMN follower_count INTEGER DEFAULT 0,
      ADD COLUMN following_count INTEGER DEFAULT 0;
    `);

    await queryRunner.query(`
      CREATE INDEX idx_users_username ON users(username);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS idx_users_username;`);
    await queryRunner.query(`
      ALTER TABLE users
      DROP COLUMN username,
      DROP COLUMN bio,
      DROP COLUMN is_public,
      DROP COLUMN avatar_url,
      DROP COLUMN follower_count,
      DROP COLUMN following_count;
    `);
  }
}
```

#### 1.3. Criar ProfileController

**Arquivo:** `backend/src/modules/users/profile.controller.ts`

```typescript
import { Controller, Get, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  @UseGuards(OptionalJwtAuthGuard) // Permite acesso sem autenticação
  @ApiOperation({ summary: 'Get public profile by username' })
  @ApiResponse({ status: 200, description: 'Profile found' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  async getPublicProfile(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user || !user.isPublic) {
      throw new NotFoundException('Profile not found or is private');
    }

    // Retornar apenas dados públicos
    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      mbtiType: user.mbtiType,
      level: user.level,
      xp: user.xp,
      streakCurrent: user.streakCurrent,
      followerCount: user.followerCount,
      followingCount: user.followingCount,
      createdAt: user.createdAt,
      // NÃO retornar: email, senha, subscription, etc.
    };
  }
}
```

#### 1.4. Atualizar UsersService

**Arquivo:** `backend/src/modules/users/users.service.ts`

```typescript
async findByUsername(username: string): Promise<User | null> {
  return this.userRepository.findOne({
    where: { username },
    select: [
      'id', 'username', 'fullName', 'bio', 'avatarUrl', 'mbtiType',
      'level', 'xp', 'streakCurrent', 'followerCount', 'followingCount',
      'isPublic', 'createdAt'
    ]
  });
}

async updateProfile(userId: string, updateData: {
  username?: string;
  bio?: string;
  isPublic?: boolean;
  avatarUrl?: string;
}) {
  // Validar username único
  if (updateData.username) {
    const existing = await this.findByUsername(updateData.username);
    if (existing && existing.id !== userId) {
      throw new ConflictException('Username already taken');
    }
  }

  await this.userRepository.update(userId, updateData);
  return this.findOne(userId);
}
```

### Frontend

#### 1.5. Criar Profile Page

**Arquivo:** `frontend/src/pages/Profile.tsx`

```typescript
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '@/lib/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Trophy, Users } from 'lucide-react';

interface PublicProfile {
  id: string;
  username: string;
  fullName: string;
  bio: string;
  avatarUrl: string;
  mbtiType: string;
  level: number;
  xp: number;
  streakCurrent: number;
  followerCount: number;
  followingCount: number;
  createdAt: string;
}

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, [username]);

  const loadProfile = async () => {
    try {
      const response = await api.get(`/profile/${username}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Carregando perfil...</div>;
  if (!profile) return <div>Perfil não encontrado</div>;

  return (
    <div className="container max-w-4xl py-8">
      {/* Header Card */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile.avatarUrl} />
            <AvatarFallback>{profile.fullName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl">{profile.fullName}</CardTitle>
            <CardDescription>@{profile.username}</CardDescription>
            <div className="mt-2">
              <Badge variant="secondary">{profile.mbtiType}</Badge>
              <Badge variant="outline" className="ml-2">Nível {profile.level}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{profile.bio}</p>

          <div className="mt-6 grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{profile.xp.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Trophy className="h-4 w-4" />
                XP
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{profile.streakCurrent}</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Flame className="h-4 w-4" />
                Streak
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{profile.followerCount}</div>
              <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Users className="h-4 w-4" />
                Seguidores
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{profile.followingCount}</div>
              <div className="text-sm text-muted-foreground">Seguindo</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TODO: Conquistas, Atividade Recente, etc. */}
    </div>
  );
}
```

#### 1.6. Adicionar Rota

**Arquivo:** `frontend/src/App.tsx`

```typescript
import Profile from './pages/Profile';

// Dentro de <Routes>
<Route path="/@:username" element={<Profile />} />
```

---

## 👥 Fase 2: Sistema de Seguidores (3 dias)

### Backend

#### 2.1. Criar Follow Entity

**Arquivo:** `backend/src/modules/social/entities/follow.entity.ts`

```typescript
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, Index } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('follows')
@Index(['followerId', 'followingId'], { unique: true })
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'follower_id' })
  followerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'follower_id' })
  follower: User;

  @Column({ name: 'following_id' })
  followingId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'following_id' })
  following: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
```

#### 2.2. Criar SocialModule

**Arquivo:** `backend/src/modules/social/social.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';
import { Follow } from './entities/follow.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follow, User])],
  controllers: [SocialController],
  providers: [SocialService],
  exports: [SocialService],
})
export class SocialModule {}
```

#### 2.3. Criar SocialService

**Arquivo:** `backend/src/modules/social/social.service.ts`

```typescript
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async followUser(followerId: string, followingId: string): Promise<void> {
    if (followerId === followingId) {
      throw new BadRequestException('Cannot follow yourself');
    }

    // Verificar se usuário existe
    const following = await this.userRepository.findOne({ where: { id: followingId } });
    if (!following) {
      throw new NotFoundException('User not found');
    }

    // Verificar se já segue
    const existing = await this.followRepository.findOne({
      where: { followerId, followingId }
    });

    if (existing) {
      return; // Já segue, operação idempotente
    }

    // Criar follow
    const follow = this.followRepository.create({ followerId, followingId });
    await this.followRepository.save(follow);

    // Atualizar contadores
    await this.userRepository.increment({ id: followerId }, 'followingCount', 1);
    await this.userRepository.increment({ id: followingId }, 'followerCount', 1);
  }

  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    const follow = await this.followRepository.findOne({
      where: { followerId, followingId }
    });

    if (!follow) {
      return; // Não segue, operação idempotente
    }

    await this.followRepository.remove(follow);

    // Atualizar contadores
    await this.userRepository.decrement({ id: followerId }, 'followingCount', 1);
    await this.userRepository.decrement({ id: followingId }, 'followerCount', 1);
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const count = await this.followRepository.count({
      where: { followerId, followingId }
    });
    return count > 0;
  }

  async getFollowers(userId: string, limit = 50, offset = 0) {
    const [follows, total] = await this.followRepository.findAndCount({
      where: { followingId: userId },
      relations: ['follower'],
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' }
    });

    return {
      data: follows.map(f => ({
        id: f.follower.id,
        username: f.follower.username,
        fullName: f.follower.fullName,
        avatarUrl: f.follower.avatarUrl,
        mbtiType: f.follower.mbtiType,
        followedAt: f.createdAt
      })),
      total,
      limit,
      offset
    };
  }

  async getFollowing(userId: string, limit = 50, offset = 0) {
    const [follows, total] = await this.followRepository.findAndCount({
      where: { followerId: userId },
      relations: ['following'],
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' }
    });

    return {
      data: follows.map(f => ({
        id: f.following.id,
        username: f.following.username,
        fullName: f.following.fullName,
        avatarUrl: f.following.avatarUrl,
        mbtiType: f.following.mbtiType,
        followedAt: f.createdAt
      })),
      total,
      limit,
      offset
    };
  }
}
```

#### 2.4. Criar SocialController

**Arquivo:** `backend/src/modules/social/social.controller.ts`

```typescript
import { Controller, Post, Delete, Get, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SocialService } from './social.service';

@ApiTags('Social')
@Controller('social')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Post('follow/:userId')
  @ApiOperation({ summary: 'Follow a user' })
  async followUser(@Req() req, @Param('userId') userId: string) {
    await this.socialService.followUser(req.user.userId, userId);
    return { message: 'User followed successfully' };
  }

  @Delete('follow/:userId')
  @ApiOperation({ summary: 'Unfollow a user' })
  async unfollowUser(@Req() req, @Param('userId') userId: string) {
    await this.socialService.unfollowUser(req.user.userId, userId);
    return { message: 'User unfollowed successfully' };
  }

  @Get('is-following/:userId')
  @ApiOperation({ summary: 'Check if following a user' })
  async isFollowing(@Req() req, @Param('userId') userId: string) {
    const isFollowing = await this.socialService.isFollowing(req.user.userId, userId);
    return { isFollowing };
  }

  @Get('followers/:userId')
  @ApiOperation({ summary: 'Get user followers' })
  async getFollowers(
    @Param('userId') userId: string,
    @Query('limit') limit = 50,
    @Query('offset') offset = 0
  ) {
    return this.socialService.getFollowers(userId, +limit, +offset);
  }

  @Get('following/:userId')
  @ApiOperation({ summary: 'Get users being followed' })
  async getFollowing(
    @Param('userId') userId: string,
    @Query('limit') limit = 50,
    @Query('offset') offset = 0
  ) {
    return this.socialService.getFollowing(userId, +limit, +offset);
  }
}
```

### Frontend

#### 2.5. Criar useSocial Hook

**Arquivo:** `frontend/src/hooks/useSocial.ts`

```typescript
import { useState } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export function useSocial() {
  const [loading, setLoading] = useState(false);

  const followUser = async (userId: string) => {
    try {
      setLoading(true);
      await api.post(`/social/follow/${userId}`);
      toast.success('Agora você está seguindo este usuário');
      return true;
    } catch (error) {
      console.error('Error following user:', error);
      toast.error('Erro ao seguir usuário');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const unfollowUser = async (userId: string) => {
    try {
      setLoading(true);
      await api.delete(`/social/follow/${userId}`);
      toast.success('Você deixou de seguir este usuário');
      return true;
    } catch (error) {
      console.error('Error unfollowing user:', error);
      toast.error('Erro ao deixar de seguir');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const checkIsFollowing = async (userId: string): Promise<boolean> => {
    try {
      const response = await api.get(`/social/is-following/${userId}`);
      return response.data.isFollowing;
    } catch (error) {
      console.error('Error checking follow status:', error);
      return false;
    }
  };

  return {
    followUser,
    unfollowUser,
    checkIsFollowing,
    loading
  };
}
```

#### 2.6. Criar FollowButton Component

**Arquivo:** `frontend/src/components/social/FollowButton.tsx`

```typescript
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSocial } from '@/hooks/useSocial';
import { UserPlus, UserMinus } from 'lucide-react';

interface FollowButtonProps {
  userId: string;
  variant?: 'default' | 'outline';
}

export function FollowButton({ userId, variant = 'default' }: FollowButtonProps) {
  const { followUser, unfollowUser, checkIsFollowing, loading } = useSocial();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    loadFollowStatus();
  }, [userId]);

  const loadFollowStatus = async () => {
    const status = await checkIsFollowing(userId);
    setIsFollowing(status);
  };

  const handleToggleFollow = async () => {
    if (isFollowing) {
      const success = await unfollowUser(userId);
      if (success) setIsFollowing(false);
    } else {
      const success = await followUser(userId);
      if (success) setIsFollowing(true);
    }
  };

  return (
    <Button
      variant={isFollowing ? 'outline' : variant}
      onClick={handleToggleFollow}
      disabled={loading}
    >
      {isFollowing ? (
        <>
          <UserMinus className="mr-2 h-4 w-4" />
          Deixar de Seguir
        </>
      ) : (
        <>
          <UserPlus className="mr-2 h-4 w-4" />
          Seguir
        </>
      )}
    </Button>
  );
}
```

---

## 🏆 Fase 3: Leaderboards (2 dias)

### Backend

#### 3.1. Criar LeaderboardModule

**Arquivo:** `backend/src/modules/leaderboard/leaderboard.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getTopByXP(limit = 10) {
    const users = await this.userRepository.find({
      where: { isPublic: true },
      order: { xp: 'DESC', level: 'DESC' },
      take: limit,
      select: ['id', 'username', 'fullName', 'avatarUrl', 'mbtiType', 'level', 'xp']
    });

    return users.map((user, index) => ({
      rank: index + 1,
      ...user
    }));
  }

  async getTopByType(mbtiType: string, limit = 10) {
    const users = await this.userRepository.find({
      where: { mbtiType, isPublic: true },
      order: { xp: 'DESC', level: 'DESC' },
      take: limit,
      select: ['id', 'username', 'fullName', 'avatarUrl', 'level', 'xp']
    });

    return users.map((user, index) => ({
      rank: index + 1,
      ...user
    }));
  }

  async getTopByStreak(limit = 10) {
    const users = await this.userRepository.find({
      where: { isPublic: true },
      order: { streakCurrent: 'DESC', xp: 'DESC' },
      take: limit,
      select: ['id', 'username', 'fullName', 'avatarUrl', 'mbtiType', 'streakCurrent']
    });

    return users.map((user, index) => ({
      rank: index + 1,
      ...user
    }));
  }

  async getUserRank(userId: string): Promise<{
    globalRank: number;
    typeRank: number;
    totalUsers: number;
  }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) return { globalRank: 0, typeRank: 0, totalUsers: 0 };

    // Rank global
    const globalRank = await this.userRepository
      .createQueryBuilder()
      .where('xp > :xp', { xp: user.xp })
      .getCount() + 1;

    // Rank por tipo
    const typeRank = await this.userRepository
      .createQueryBuilder()
      .where('mbti_type = :type AND xp > :xp', { type: user.mbtiType, xp: user.xp })
      .getCount() + 1;

    const totalUsers = await this.userRepository.count();

    return { globalRank, typeRank, totalUsers };
  }
}
```

### Frontend

#### 3.2. Criar Leaderboard Page

**Arquivo:** `frontend/src/pages/Leaderboard.tsx`

```typescript
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Flame, Users } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  mbtiType: string;
  level: number;
  xp: number;
  streakCurrent?: number;
}

export default function Leaderboard() {
  const [topByXP, setTopByXP] = useState<LeaderboardEntry[]>([]);
  const [topByStreak, setTopByStreak] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboards();
  }, []);

  const loadLeaderboards = async () => {
    try {
      const [xpResponse, streakResponse] = await Promise.all([
        api.get('/leaderboard/xp'),
        api.get('/leaderboard/streak')
      ]);
      setTopByXP(xpResponse.data);
      setTopByStreak(streakResponse.data);
    } catch (error) {
      console.error('Error loading leaderboards:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderEntry = (entry: LeaderboardEntry, metric: 'xp' | 'streak') => (
    <div key={entry.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50">
      <div className="text-2xl font-bold w-12 text-center">
        {entry.rank === 1 && '🥇'}
        {entry.rank === 2 && '🥈'}
        {entry.rank === 3 && '🥉'}
        {entry.rank > 3 && `#${entry.rank}`}
      </div>
      <Avatar>
        <AvatarImage src={entry.avatarUrl} />
        <AvatarFallback>{entry.fullName[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="font-semibold">{entry.fullName}</div>
        <div className="text-sm text-muted-foreground">@{entry.username}</div>
      </div>
      <Badge variant="secondary">{entry.mbtiType}</Badge>
      <div className="text-right">
        <div className="text-2xl font-bold">
          {metric === 'xp' ? entry.xp.toLocaleString() : entry.streakCurrent}
        </div>
        <div className="text-sm text-muted-foreground">
          {metric === 'xp' ? 'XP' : 'dias'}
        </div>
      </div>
    </div>
  );

  if (loading) return <div>Carregando rankings...</div>;

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-6">Leaderboards</h1>

      <Tabs defaultValue="xp">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="xp">
            <Trophy className="mr-2 h-4 w-4" />
            Top XP
          </TabsTrigger>
          <TabsTrigger value="streak">
            <Flame className="mr-2 h-4 w-4" />
            Top Streak
          </TabsTrigger>
        </TabsList>

        <TabsContent value="xp">
          <Card>
            <CardHeader>
              <CardTitle>Top 10 por XP</CardTitle>
              <CardDescription>Os usuários com mais experiência</CardDescription>
            </CardHeader>
            <CardContent>
              {topByXP.map(entry => renderEntry(entry, 'xp'))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="streak">
          <Card>
            <CardHeader>
              <CardTitle>Top 10 por Streak</CardTitle>
              <CardDescription>As maiores sequências de dias consecutivos</CardDescription>
            </CardHeader>
            <CardContent>
              {topByStreak.map(entry => renderEntry(entry, 'streak'))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## 🎁 Fase 4: Referral Program (2 dias)

### Backend

#### 4.1. Criar Referral Entity

**Arquivo:** `backend/src/modules/referrals/entities/referral.entity.ts`

```typescript
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('referrals')
export class Referral {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'referrer_id' })
  referrerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'referrer_id' })
  referrer: User;

  @Column({ name: 'referred_user_id', nullable: true })
  referredUserId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'referred_user_id' })
  referredUser: User;

  @Column({ name: 'referral_code', unique: true })
  referralCode: string;

  @Column({ default: 'pending' }) // pending, completed, rewarded
  status: string;

  @Column({ name: 'reward_claimed', default: false })
  rewardClaimed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'completed_at', nullable: true })
  completedAt: Date;
}
```

#### 4.2. Criar ReferralsService

**Arquivo:** `backend/src/modules/referrals/referrals.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Referral } from './entities/referral.entity';
import { GamificationService } from '../gamification/gamification.service';

@Injectable()
export class ReferralsService {
  constructor(
    @InjectRepository(Referral)
    private readonly referralRepository: Repository<Referral>,
    private readonly gamificationService: GamificationService,
  ) {}

  async getUserReferralCode(userId: string): Promise<string> {
    // Buscar código existente
    let referral = await this.referralRepository.findOne({
      where: { referrerId: userId, status: 'pending' },
      order: { createdAt: 'DESC' }
    });

    if (!referral) {
      // Gerar novo código
      const code = this.generateReferralCode();
      referral = this.referralRepository.create({
        referrerId: userId,
        referralCode: code
      });
      await this.referralRepository.save(referral);
    }

    return referral.referralCode;
  }

  async processReferral(referralCode: string, newUserId: string): Promise<void> {
    const referral = await this.referralRepository.findOne({
      where: { referralCode, status: 'pending' }
    });

    if (!referral) return;

    // Atualizar referral
    referral.referredUserId = newUserId;
    referral.status = 'completed';
    referral.completedAt = new Date();
    await this.referralRepository.save(referral);

    // Recompensar referrer: +50 XP
    await this.gamificationService.addXP(referral.referrerId, 'referral_completed', 50);

    // TODO: Dar 1 mês Pro grátis para ambos (implementar quando tiver monetização)
  }

  async getUserReferrals(userId: string) {
    const referrals = await this.referralRepository.find({
      where: { referrerId: userId },
      relations: ['referredUser'],
      order: { createdAt: 'DESC' }
    });

    const total = referrals.length;
    const completed = referrals.filter(r => r.status === 'completed').length;
    const pending = referrals.filter(r => r.status === 'pending').length;

    return {
      total,
      completed,
      pending,
      referrals: referrals.map(r => ({
        id: r.id,
        code: r.referralCode,
        status: r.status,
        referredUser: r.referredUser ? {
          username: r.referredUser.username,
          fullName: r.referredUser.fullName,
          avatarUrl: r.referredUser.avatarUrl
        } : null,
        createdAt: r.createdAt,
        completedAt: r.completedAt
      }))
    };
  }

  private generateReferralCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Remove ambiguous chars
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}
```

### Frontend

#### 4.3. Criar Referrals Page

**Arquivo:** `frontend/src/pages/Referrals.tsx`

```typescript
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Check, Gift } from 'lucide-react';
import { toast } from 'sonner';

export default function Referrals() {
  const [referralCode, setReferralCode] = useState('');
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadReferralData();
  }, []);

  const loadReferralData = async () => {
    try {
      const [codeResponse, statsResponse] = await Promise.all([
        api.get('/referrals/code'),
        api.get('/referrals/stats')
      ]);
      setReferralCode(codeResponse.data.code);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Error loading referral data:', error);
    }
  };

  const copyToClipboard = async () => {
    const url = `${window.location.origin}/register?ref=${referralCode}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link copiado!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-6">Programa de Indicações</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Convide Amigos e Ganhe Recompensas
          </CardTitle>
          <CardDescription>
            Para cada amigo que se cadastrar usando seu link, você ganha +50 XP!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={`${window.location.origin}/register?ref=${referralCode}`}
              readOnly
              className="font-mono"
            />
            <Button onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Indicações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Concluídas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pendentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
      </div>

      {/* TODO: Lista de referrals */}
    </div>
  );
}
```

---

## 📤 Fase 5: Shared Results (2 dias)

### Backend

#### 5.1. Criar Share Tracking

**Arquivo:** `backend/src/modules/social/social.service.ts`

```typescript
// Adicionar ao SocialService existente

async trackShare(userId: string, shareType: string, platform: string, metadata?: any) {
  const share = this.shareRepository.create({
    userId,
    shareType,
    platform,
    metadata
  });
  await this.shareRepository.save(share);
}

async getShareStats(userId: string) {
  const shares = await this.shareRepository.find({
    where: { userId }
  });

  const byPlatform = shares.reduce((acc, share) => {
    acc[share.platform] = (acc[share.platform] || 0) + 1;
    return acc;
  }, {});

  return {
    total: shares.length,
    byPlatform
  };
}
```

#### 5.2. Criar OG Tags Endpoint

**Arquivo:** `backend/src/modules/users/profile.controller.ts`

```typescript
@Get('share/:userId')
@ApiOperation({ summary: 'Get shareable profile data for OG tags' })
async getShareableProfile(@Param('userId') userId: string) {
  const user = await this.usersService.findOne(userId);

  if (!user || !user.isPublic) {
    throw new NotFoundException('Profile not available for sharing');
  }

  return {
    title: `${user.fullName} - ${user.mbtiType}`,
    description: user.bio || `Nível ${user.level} • ${user.xp.toLocaleString()} XP • ${user.streakCurrent} dias de streak`,
    image: user.avatarUrl || '/default-share-image.png',
    url: `${process.env.FRONTEND_URL}/@${user.username}`
  };
}
```

### Frontend

#### 5.3. Criar ShareButton Component

**Arquivo:** `frontend/src/components/social/ShareButton.tsx`

```typescript
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Share2, Twitter, Facebook, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

interface ShareButtonProps {
  userId: string;
  username: string;
  shareType: 'profile' | 'test_result' | 'achievement';
}

export function ShareButton({ userId, username, shareType }: ShareButtonProps) {
  const url = `${window.location.origin}/@${username}`;

  const trackShare = async (platform: string) => {
    try {
      await api.post('/social/share', { shareType, platform });
    } catch (error) {
      console.error('Error tracking share:', error);
    }
  };

  const shareToTwitter = () => {
    const text = `Confira meu perfil no Pathfinder! 🚀`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    trackShare('twitter');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    trackShare('facebook');
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success('Link copiado!');
    trackShare('copy_link');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Compartilhar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={shareToTwitter}>
          <Twitter className="mr-2 h-4 w-4" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareToFacebook}>
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyLink}>
          <LinkIcon className="mr-2 h-4 w-4" />
          Copiar Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

#### 5.4. Adicionar Meta Tags Dinâmicas

**Arquivo:** `frontend/index.html`

```html
<head>
  <!-- Existing meta tags... -->

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://pathfinder.com/">
  <meta property="og:title" content="Pathfinder - Descoberta de Personalidade">
  <meta property="og:description" content="Descubra seu tipo MBTI e conecte-se com pessoas similares">
  <meta property="og:image" content="https://pathfinder.com/og-image.png">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://pathfinder.com/">
  <meta property="twitter:title" content="Pathfinder - Descoberta de Personalidade">
  <meta property="twitter:description" content="Descubra seu tipo MBTI e conecte-se com pessoas similares">
  <meta property="twitter:image" content="https://pathfinder.com/og-image.png">
</head>
```

---

## 👥 Fase 6: Grupos por Tipo (Opcional - v2)

**NOTA:** Esta fase é OPCIONAL para o MVP. Implementar apenas se houver tempo extra.

Grupos por tipo MBTI são uma feature poderosa, mas complexa. Requer:
- Sistema de posts
- Comentários e curtidas
- Moderação
- Notificações
- Feed de atividades

**Recomendação:** Deixar para Sprint 8 após análise de métricas de engajamento das outras features sociais.

---

## ✅ Testes

### Backend

#### E2E Tests

**Arquivo:** `test-social-e2e.cjs`

```javascript
const BASE_URL = 'http://localhost:3001/api/v1';
let USER_ID, AUTH_TOKEN, USERNAME;

async function testSocialE2E() {
  console.log('\n🧪 SOCIAL E2E TESTS\n');

  // 1. Criar usuário e fazer login
  // 2. Atualizar perfil com username
  // 3. Testar follow/unfollow
  // 4. Testar leaderboard
  // 5. Testar referral code
  // 6. Testar share tracking

  // TODO: Implementar testes completos
}

testSocialE2E().catch(console.error);
```

---

## 🚀 Deploy

Após completar todas as fases, seguir os mesmos passos do Sprint 5:

1. Executar migrations em produção
2. Seed de dados (se necessário)
3. Testar endpoints via Swagger
4. Verificar funcionalidades no frontend

---

## 📊 Métricas de Sucesso

### KPIs do Sprint 7

| Métrica | Objetivo | Como Medir |
|---------|----------|------------|
| **Profiles Criados** | 80% dos usuários criam username | `SELECT COUNT(*) FROM users WHERE username IS NOT NULL` |
| **Follow Rate** | 30% dos usuários seguem alguém | `SELECT COUNT(DISTINCT follower_id) FROM follows` |
| **Leaderboard Views** | 500 views/semana | Analytics tracking |
| **Referrals Completed** | 50 referrals/mês | `SELECT COUNT(*) FROM referrals WHERE status='completed'` |
| **Shares** | 200 shares/semana | `SELECT COUNT(*) FROM shares` |
| **Social Engagement** | 40% dos usuários ativos usam features sociais | Combinar métricas acima |

### Dashboards

Criar dashboard no admin para acompanhar:
- Número de perfis públicos
- Taxa de follow (follows/usuários)
- Top referrers
- Shares por plataforma
- Leaderboard engagement

---

## 🎯 Checklist de Conclusão

### Backend
- [ ] Migration executada (username, bio, is_public, etc.)
- [ ] SocialModule completo (follow/unfollow)
- [ ] LeaderboardModule completo (XP, streak, tipo)
- [ ] ReferralsModule completo (código, tracking, recompensas)
- [ ] Share tracking implementado
- [ ] Swagger atualizado com novos endpoints
- [ ] Testes E2E passando

### Frontend
- [ ] Profile page (@username)
- [ ] FollowButton component
- [ ] Leaderboard page (XP, streak, tipo)
- [ ] Referrals page (link, stats)
- [ ] ShareButton component
- [ ] Meta tags OG configuradas
- [ ] Rotas adicionadas

### Deploy
- [ ] Migrations em produção
- [ ] Features testadas em staging
- [ ] Deploy em produção
- [ ] Monitoring configurado

---

## 📚 Documentação Adicional

- Swagger: `/api/v1/docs` (novos endpoints sociais)
- Arquitetura: Ver diagrama de entidades no topo
- Métricas: Ver KPIs section

---

**Próximo Sprint:** Sprint 8 - Analytics & Growth

_Documentação criada: 17/10/2025_
_Última atualização: 17/10/2025_
