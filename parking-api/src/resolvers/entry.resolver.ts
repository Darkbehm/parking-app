import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import {
  CreateEntryInput,
  GetEntryInput,
  UpdateEntryInput,
  Entry,
} from '../schema/entry.schema';
import EntryService from '../service/entry.service';

@Resolver()
export default class EntryResolver {
  constructor(private entryService: EntryService) {
    this.entryService = new EntryService();
  }

  @Authorized()
  @Mutation(() => Entry)
  createEntry(@Arg('input') input: CreateEntryInput) {
    return this.entryService.createEntry(input);
  }

  @Query(() => [Entry])
  entries() {
    return this.entryService.findEntries();
  }

  @Query(() => Entry, { nullable: true })
  lastEntry(@Arg('input') input: GetEntryInput): Promise<Entry> {
    return this.entryService.findLastEntry(input);
  }

  @Authorized()
  @Mutation(() => Entry)
  updateEntry(@Arg('input') input: UpdateEntryInput) {
    return this.entryService.updateEntry(input);
  }
}
