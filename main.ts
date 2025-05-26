import { Plugin, setIcon } from 'obsidian';

export default class ThemeToggle extends Plugin {
  ribbon: HTMLElement;

  async onload() {

    this.ribbon = this.addRibbonIcon(this.getThemeIcon(), "Toggle to " + (this.getCurrentTheme() === 'obsidian' ? 'light' : 'dark') + " mode", (evt: MouseEvent) => {
      // @ts-ignore
      this.app.changeTheme(this.getCurrentTheme() === 'obsidian' ? 'moonstone' : 'obsidian');
      setIcon(evt.target as HTMLElement, this.getThemeIcon());
      (evt.target as HTMLElement).setAttr("aria-label","Toggle to " + (this.getCurrentTheme() === 'obsidian' ? 'light' : 'dark') + " mode");
    });

    this.ribbon.addClass('ribbon-theme-toggle-plugin');

    this.registerEvent(
      this.app.workspace.on('css-change', () => {
        setTimeout(() => {
          setIcon(this.ribbon!, this.getCurrentTheme() === 'obsidian' ? 'sun' : 'moon');
          this.ribbon!.setAttr("aria-label","Toggle to " + (this.getCurrentTheme() === 'obsidian' ? 'light' : 'dark') + " mode");
        }, 10);
      })
    );

    this.addCommand({
      id: "toggle-theme",
      name: "Toggle theme",
      callback: () => {
        // @ts-ignore
        this.app.changeTheme(this.getCurrentTheme() === 'obsidian' ? 'moonstone' : 'obsidian');
        setIcon(this.ribbon!, this.getCurrentTheme() === 'obsidian' ? 'sun' : 'moon');
      }
    });
  }

  onunload() {
    this.ribbon.remove();
  }

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
