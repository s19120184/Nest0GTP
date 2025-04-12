import { Controller, Post, Body } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto } from './dtos';

@Controller('gpt')
export class GptController {

  //inyeccion de la dependecia del service
  constructor(private readonly gptService: GptService) {}

  //crear endpoint en el controlador
  @Post('orthography-check')
  orthographyCheck(
      //en el body esperamos un tipo orthographyDto
     @Body()orthographyDto:OrthographyDto
  ){
    

    return  this.gptService.orthographyChech(orthographyDto)
  }


}
