import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Post,
  Req,
  Body,
  Put, Query
} from "@nestjs/common";
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleEnabled } from '../../decorators/accessRole.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
export interface IQuery {
  search?: string,
  gender?: string,
  technical?: string
}
@ApiTags('users')
@Controller('users')
// @ApiBearerAuth()
// @RoleEnabled('admin')

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query() query:IQuery) {
    // console.log('salom men users api request keldim');
    // const allData = ;
    return await this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  async startEvent(@Req() req, @Body() startDto: CreateUserDto) {
    return await this.usersService.create(startDto);
  }
  @Put(':id')
  // @ApiBearerAuth()
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateEventCategoryDto: CreateUserDto,
  ): Promise<any> {
    console.log(updateEventCategoryDto, id);
    return await this.usersService.update(updateEventCategoryDto, +id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
