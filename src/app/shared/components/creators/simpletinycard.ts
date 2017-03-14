import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
declare var tinymce: any;
@Component({
  selector: 'simple-tiny',
  template: `<textarea id="{{elementId}}">{{blogdata}}</textarea>`
})
export class SimpleTinyCard implements AfterViewInit, OnDestroy {
  @Input() elementId: String;
   @Input() blogdata: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table', 'media', 'textcolor', 'spellchecker'],
      skin_url: './assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}