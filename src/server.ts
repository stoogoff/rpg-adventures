
import { Application, Context, Router } from '@oak/oak'
import { router, staticFiles, Repository, SiteModel, View } from './mvc/index.ts'
import { Config } from './config.ts'
import { register as registerCore } from './modules/core/index.ts'

const repo = new Repository({
	dbHost: Deno.env.get('DATABASE_URL')!,
	dbUser: Deno.env.get('DATABASE_USER')!,
	dbPassword: Deno.env.get('DATABASE_PASSWORD')!,
})

const app = new Application()
const view = registerCore(repo)

app.use(router.routes())
app.use(router.allowedMethods())

// serve static files
app.use(staticFiles(`${Deno.cwd()}${Config.staticPath}`))

// catch all static pages which don't need a controller
app.use(async (ctx: Context) => {
	ctx.response.body = await view.renderContext(ctx)
})

app.addEventListener('listen', ({ port }) => console.log(`Listening on port: ${port}`))
app.listen({ port: Config.port })
