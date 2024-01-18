import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const hello = 'Hello World... &#128514;';
    return hello;
  }
}
