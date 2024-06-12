import { Controller, Get, Param, Delete, Post, Req, Body, Put } from "@nestjs/common";
import { Technical_languageService } from './technical_language.service';
import { ApiTags } from "@nestjs/swagger";
import { RoleEnabled } from '../../decorators/accessRole.decorator';
import { CreateTechDto } from "./dto/technical_lang.dto";

@ApiTags('technical-languages')
@Controller('technical-languages')
// @ApiBearerAuth()
// @RoleEnabled('admin')
export class Technical_languageController {
  constructor(private readonly technicalService: Technical_languageService) {}

  @Get()
  findAll() {
    return this.technicalService.findAll();
  }
  @Post()
  create(@Req() req, @Body() technicalItem: CreateTechDto) {
    return this.technicalService.create(technicalItem);
  }
  @Put(':id')
  update(@Req() req, @Body() technicalItem: CreateTechDto) {
    return this.technicalService.create(technicalItem);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technicalService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.technicalService.remove(+id);
  }
}
