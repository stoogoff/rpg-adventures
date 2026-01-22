
import { CouchId, CouchRecord } from '~/mvc/index.ts'
import { Adventure, AdventureModel } from './adventure.ts'
import { System, SystemModel } from './system.ts'
import { ICON_CAMPAIGN } from '~/utils/config.ts'

export interface Campaign extends CouchRecord {
  title: string;
  summary: string;
  system: string;
  adventures: string[];
}

export class CampaignModel {
  icon = ICON_CAMPAIGN
  slug: string = ''
  title: string = ''
  summary: string = ''
  system?: SystemModel | null
  adventures: AdventureModel[] = []
  created: Date = new Date()
  modified: Date = new Date()

  static fromDb(input: Campaign, system: System | null = null, adventures: Adventure[] = []): CampaignModel {
    const model = new CampaignModel()
    const id = CouchId.fromString(input._id)

    model.slug = id.toSlug()
    model.title = input.title
    model.summary = input.summary
    model.adventures = adventures.map(adv => AdventureModel.fromDb(adv))
    model.created = new Date(input.created)
    model.modified = new Date(input.modified)

    if(system) {
      model.system = SystemModel.fromDb(system)
    }

    return model
  }
}