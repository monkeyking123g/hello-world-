import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import {  DeepPartial, ObjectLiteral } from 'typeorm';
import { IBaseService, IUpdateInput } from './base.service';
import { Type } from '@nestjs/common';


export interface IBaseResolver<T extends ObjectLiteral> {
  readonly baseService: IBaseService<T>;
  findAll: () => Promise<T[] | null>;
  findOne: (id: number) => Promise<T | null>;
  create: (createInput: DeepPartial<T>) => Promise<T | boolean>;
  update: (updateInput: IUpdateInput<T>) => Promise<T | boolean>;
  remove: (id: number) => Promise<boolean>;
}

type Constructor<I> = new (...args: any[]) => I; 

export function BaseResolver<T extends ObjectLiteral, U, C>(
  classRef: Constructor<T>,
  updateInputType: U,
  createInputType: C,
): Type<IBaseResolver<T>> {
  @Resolver({ isAbstract: true })
  class BaseResolver implements IBaseResolver<T> {
    constructor(readonly baseService: IBaseService<T>) {}

    @Query((returns) => [classRef], { name: `findAll${classRef.name}` })
    async findAll(): Promise<T[]> {
      return this.baseService.findAll();
    }

    @Query((returns) => classRef, { name: `find${classRef.name}ById` })
    async findOne(@Args('id') id: number): Promise<T | undefined> {
      return this.baseService.findById(id);
    }

    @Mutation((returns) => classRef, { name: `create${classRef.name}` })
    async create(@Args({
      type: () => createInputType,
      name: `create${classRef.name}Input`,
    })
    createInput: DeepPartial<T>,): Promise<T> {
      return this.baseService.create(createInput);
    }

    @Mutation((returns) => classRef, { name: `update${classRef.name}ById` })
    async update(
      @Args({
        type: () => updateInputType,
        name: `update${classRef.name}Input`,
      })
      updateInput: IUpdateInput<T>
    ): Promise<T | undefined> {
      
      return this.baseService.update(updateInput);
    }

    @Mutation((returns) => Boolean, { name: `delete${classRef.name}ById` })
    async remove(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
      return this.baseService.delete(id);
    }
  }

  return BaseResolver;
}


