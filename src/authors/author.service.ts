import { Injectable } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class AuthorService extends BaseService(Author, this) {}
