
import { CouchId, CouchRecord } from '~/mvc/index.ts'
import { format } from '~/utils/string.ts'
import { Adventure, AdventureModel } from './adventure.ts'
import { System, SystemModel } from './system.ts'

export interface Campaign extends CouchRecord {
  title: string;
  summary: string;
  system: string;
  adventures: string[];
}

export class CampaignModel {
  slug: string = ''
  title: string = ''
  summary: string = ''
  system?: SystemModel | null
  adventures: AdventureModel[] = []

  static fromDb(input: Campaign, system: System | null = null, adventures: Adventure[] = []) {
    const model = new CampaignModel()
    const id = CouchId.fromString(input._id)

    model.slug = id.toSlug()
    model.title = input.title
    model.summary = format(input.summary)
    model.adventures = adventures.map(adv => AdventureModel.fromDb(adv))

    if(system) {
      model.system = SystemModel.fromDb(system)
    }

    return model
  }
}