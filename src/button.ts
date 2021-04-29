import { ToolBarManager, getToolBarManager } from "atom/tool-bar"

let toolbar: ToolBarManager

export function consumeToolBar(getToolBar: getToolBarManager) {
  toolbar = getToolBar("atomic-terminal") // getting toolbar object
  toolbar.addButton({
    icon: "terminal",
    tooltip: "Open Terminal",
    callback: "atomic-terminal:open",
  })
}
