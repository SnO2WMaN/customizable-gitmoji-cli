import explorer from './configExplorer'

export default async function() {
  const result = await explorer.search()
  if (result && !result.isEmpty) return result.config.scopes
  return []
}
