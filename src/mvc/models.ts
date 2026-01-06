
export interface SiteMetadata {
	title?: string;
	description?: string;
	url?: URL;
	image?: string;
	type?: string;
}

export class MetadataModel {
	private page: MetadataModel | undefined

	constructor(private metadata: Partial<SiteMetadata>) {}

	get title(): string {
		return this.page && this.page.title ? this.page.title + this.metadata.title : this.metadata.title ?? ''
	}

	get description(): string {
		return this.overrideProperty('description')
	}

	get url(): string {
		if(this.page && this.page.url) {
			return this.page.url.toString()
		}

		if(this.metadata.url) {
			return this.metadata.url.toString()
		}

		return ''
	}

	get image(): string {
		return this.overrideProperty('image')
	}

	get type(): string {
		return this.overrideProperty('type')
	}

	merge(page: MetadataModel): MetadataModel {
		this.page = page

		return this
	}

	async toRaw() {
		const model = {
			title: this.title,
			description: this.description,
			url: this.url,
			image: this.image,
			type: this.type,
		}

		//@ts-ignore
		if(this.page) model.data = this.page.data

		return model
	}

	private overrideProperty(property: keyof SiteMetadata): string {
		//@ts-ignore
		return this.page && this.page[property] ? this.page[property] : this.metadata[property] ?? ''
	}
}

export class SiteModel extends MetadataModel {
	constructor(metadata: Partial<SiteMetadata>, private baseImagePath: string) {
		super(metadata)
	}

	imagePath(path: string): string {
		return this.baseImagePath + path
	}

	isActiveNav(path: string): boolean {
		const url = new URL(path, this.url)

		return url.href === this.url
	}

	override async toRaw() {
		const model = await super.toRaw()

		//@ts-ignore
		model.imagePath = this.imagePath.bind(this)

		//@ts-ignore
		model.isActiveNav = this.isActiveNav.bind(this)

		return model
	}
}

export class PageModel extends MetadataModel {
	constructor(metadata: Partial<SiteMetadata>, private data: any | any[] | undefined = undefined) {
		super(metadata)
	}

	toJson() {
		return this.data
	}
}
