import { Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, FindOneOptions, FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class IUpdateInput<T extends QueryDeepPartialEntity<T>> {
  id: number;
}

export interface IBaseService<T extends ObjectLiteral> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | undefined>;
  create(input: DeepPartial<T>): Promise<T>;
  update(updateInput: IUpdateInput<T>): Promise<T | undefined>;
  delete(id: number): Promise<boolean>;
}

type Constructor<I> = new (...args: any[]) => I; // Main Point

export function BaseService<T extends ObjectLiteral>(
  entity: Constructor<T>,
  service,
): Type<IBaseService<T>> {
class BaseService implements IBaseService<T> {
  @InjectRepository(entity) public readonly repository: Repository<T>;

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<T | undefined> {

    const findOptions: FindOneOptions<T> = {
      where: {
        id,
      } as unknown as FindOptionsWhere<T>,
    };

    return this.repository.findOne(findOptions);
  }

  async create(input: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(input);
    return this.repository.save(newEntity);
  }

  async update(updateInput: IUpdateInput<T>): Promise<T | undefined> {
    const { id, ...updatedInfo } = updateInput;
    await this.findById(id);
    await this.repository.update(id, updatedInfo);
    return await this.findById(updateInput.id);
  }

  async delete(id: number): Promise<boolean> {

    if (!(await this.findById(id))) {
      return false;
    }

    const deleteResult = await this.repository.delete(id);
    
    return deleteResult.affected > 0;
  }
}

return BaseService;
}
