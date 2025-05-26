import { Plugin, setIcon } from 'obsidian';

export default class ThemeToggle extends Plugin {

  async onload() {

    const ribbonIconEl: HTMLElement = this.addRibbonIcon(this.getThemeIcon(), "Toggle to " + (this.getCurrentTheme() === 'obsidian' ? 'light' : 'dark') + " mode", (evt: MouseEvent) => {
      // @ts-ignore
      this.app.changeTheme(this.getCurrentTheme() === 'obsidian' ? 'moonstone' : 'obsidian');
      setIcon(evt.target as HTMLElement, this.getThemeIcon());
      (evt.target as HTMLElement).setAttr("aria-label","Toggle to " + (this.getCurrentTheme() === 'obsidian' ? 'light' : 'dark') + " mode");
    });

    ribbonIconEl.addClass('ribbon-theme-toggle-plugin');

    this.registerEvent(
      this.app.workspace.on('css-change', () => {
        setTimeout(() => {
          setIcon(ribbonIconEl!, this.getCurrentTheme() === 'obsidian' ? 'sun' : 'moon');
          ribbonIconEl!.setAttr("aria-label","Toggle to " + (this.getCurrentTheme() === 'obsidian' ? 'light' : 'dark') + " mode");
        }, 10);
      })
    );

    this.addCommand({
      id: "toggle-theme",
      name: "Toggle theme",
      callback: () => {
        // @ts-ignore
        this.app.changeTheme(this.getCurrentTheme() === 'obsidian' ? 'moonstone' : 'obsidian');
        setIcon(ribbonIconEl!, this.getCurrentTheme() === 'obsidian' ? 'sun' : 'moon');
      }
    });
  }

  onunload() {}

  getCurrentTheme() {
    // @ts-ignore
    let currentTheme: string = this.app.getTheme() === 'obsidian' ? 'obsidian' : 'moonstone';
    return currentTheme;
  }

  getThemeIcon() {
    let moonOrSunIcon: string = this.getCurrentTheme() === 'obsidian' ? 'sun' : 'moon';
    return moonOrSunIcon;
  }

}
