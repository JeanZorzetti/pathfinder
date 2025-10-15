import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @Public()
  @ApiOperation({ summary: 'Health check endpoint' })
  check() {
    return {
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
    };
  }

  @Get('ready')
  @Public()
  @ApiOperation({ summary: 'Readiness check endpoint' })
  ready() {
    return {
      success: true,
      status: 'ready',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('live')
  @Public()
  @ApiOperation({ summary: 'Liveness check endpoint' })
  live() {
    return {
      success: true,
      status: 'alive',
      timestamp: new Date().toISOString(),
    };
  }
}
