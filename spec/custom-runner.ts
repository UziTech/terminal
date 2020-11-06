// @ts-ignore
import { createRunner } from "atom-jasmine3-test-runner"
import { config, configObjects } from "../src/config"


function setDefaultSettings(namespace: string, settings: configObjects) {
  for (const name in settings) {
    const setting = settings[name]
    if (setting.type === "object") {
      setDefaultSettings(`${namespace}.${name}`, setting.properties as configObjects)
    } else {
      atom.config.set(`${namespace}.${name}`, setting.default)
    }
  }
}

module.exports = createRunner(
  {
    specHelper: {
      attachToDom: true,
      customMatchers: true,
    },
  },
  () => {
    // eslint-disable-next-line no-console
    const warn = console.warn.bind(console)
    beforeEach(() => {
      setDefaultSettings("terminal", config)
      spyOn(console, "warn").and.callFake((...args: unknown[]) => {
        if (typeof args[0] === "string" && (args[0] as string).includes("not attached to the DOM")) {
          return
        }
        warn(...args)
      })
    })
  }
)
