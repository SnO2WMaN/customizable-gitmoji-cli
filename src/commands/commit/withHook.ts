import fs from 'fs-extra'

export default (title: string) => {
  try {
    fs.writeFileSync(process.argv[3], `${title}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}
