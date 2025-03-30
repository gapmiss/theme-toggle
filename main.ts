import { Plugin, setIcon } from 'obsidian';

export default class ThemeToggle extends Plugin {

  async onload() {

    this.registerEvent(
      this.app.workspace.on('css-change', () => {
        setTimeout(() => {
          let ribbonIcon: HTMLElement | null = window.document.querySelector('.ribbon-theme-toggle-plugin');
          setIcon(ribbonIcon!, this.getCurrentTheme() === 'obsidian' ? 'sun' : 'moon');
          ribbonIcon!.setAttr("aria-label","Theme toggle: " + (this.getCurrentTheme() === 'obsidian' ? 'light' : 'dark') + " mode");
        }, 10);
      })
    );

    const ribbonIconEl = this.addRibbonIcon(this.getThemeIcon(), "Theme toggle: " + (this.getCurrentTheme() === 'obsidian' ? 'light' : 'dark') + " mode", (evt: MouseEvent) => {
      // @ts-ignore
      this.app.changeTheme(this.getCurrentTheme() === 'obsidian' ? 'moonstone' : 'obsidian');
      setIcon(evt.target as HTMLElement, this.getThemeIcon());
      (evt.target as HTMLElement).setAttr("aria-label","Theme toggle: " + (this.getCurrentTheme() === 'obsidian' ? 'light' : 'dark') + " mode");
    });

    ribbonIconEl.addClass('ribbon-theme-toggle-plugin');

    this.addCommand({
      id: "toggle-theme",
      name: "Toggle theme",
      callback: () => {
        // @ts-ignore
        this.app.changeTheme(this.getCurrentTheme() === 'obsidian' ? 'moonstone' : 'obsidian');
        let ribbonIcon: HTMLElement | null = window.document.querySelector('.ribbon-theme-toggle-plugin');
        setIcon(ribbonIcon!, this.getCurrentTheme() === 'obsidian' ? 'sun' : 'moon');
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
    let moonOrSunIcon = this.getCurrentTheme() === 'obsidian' ? 'sun' : 'moon';
    return moonOrSunIcon;
  }

}
