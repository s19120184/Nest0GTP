import { Injectable } from '@nestjs/common';
import { orthographyChechUseCase } from './use-cases/orthography.use-case';
import { OrthographyDto } from './dtos';
import OpenAI from 'openai';
import { ProsConsDiscusserDto } from './dtos/prosConsDicusser.dto';
import { prosConsDicusserUseCase } from './use-cases/prosConsDicusser.use-case';
import { prosConsDicusserStreamUseCase } from './use-cases/prosConsDicusserStream.use-case';
import { TranslateDto } from './dtos/translate.dto';
import { translateUseCase } from './use-cases/translate.use-case';

@Injectable()
export class GptService {
  //el service solo va llamar los casos de uso

  //creamos la instancia de OpenAI
  private openai = new OpenAI({
    baseURL: 'https://api.deepseek.com/v1',
    apiKey: process.env.DEEPSEEK_API_KEY,
  });

  async orthographyChech(orthographyDto: OrthographyDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await orthographyChechUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async proConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openai, { prompt });
  }

  async proConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, { prompt });
  }
  async translateStream({ prompt, lang }: TranslateDto) {
    return await translateUseCase(this.openai, {
      prompt: prompt,
      lang: lang,
    });
  }
}
