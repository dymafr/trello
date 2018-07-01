import { Component } from '@angular/core';
import { List } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public listLabel = '';
  public itemLabel = '';
  public lists: List[] = [{
    label: 'list1',
    items: [
      {
        content: 'item 1'
      },
      {
        content: 'item 2'
      },
      {
        content: 'item 3'
      },
      {
        content: 'item 4'
      },
      {
        content: 'item 5'
      }
    ]
  }];

  public addList(): void {
    if (this.listLabel) {
      this.lists.push({
        label: this.listLabel,
        items: []
      });

      this.listLabel = '';
    }
  }

  public addItem(list: List): void {
    if (this.itemLabel) {
      list.items.push({
        content: this.itemLabel
      });

      this.itemLabel = '';
    }
  }

  public switchItem($event: {
    src: { itemIndex: number, listIndex: number },
    dst: { itemIndex: number, listIndex: number }
  }) {
    [
      this.lists[$event.src.listIndex].items[$event.src.itemIndex].content,
      this.lists[$event.dst.listIndex].items[$event.dst.itemIndex].content
    ] = [
      this.lists[$event.dst.listIndex].items[$event.dst.itemIndex].content,
      this.lists[$event.src.listIndex].items[$event.src.itemIndex].content
    ];
  }

  public switchList($event: {
    src: { itemIndex: number, listIndex: number },
    dst: { listIndex: number }
  }) {
    this.lists[$event.dst.listIndex].items.push({ ...this.lists[$event.src.listIndex].items[$event.src.itemIndex] });
    this.lists[$event.src.listIndex].items.splice($event.src.itemIndex, 1);
  }
}
