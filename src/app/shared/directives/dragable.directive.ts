import { Item } from './../models/item.model';
import { Directive, HostBinding, HostListener, EventEmitter, Output, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDragable]'
})
export class DragableDirective {
  @HostBinding('draggable') public draggable = true;
  @HostBinding('class.over') public currentlyIn = false;
  @Input('item') public item: Item;
  @Output() public switchItem: EventEmitter<{
    src: { itemIndex: number, listIndex: number },
    dst: { itemIndex: number, listIndex: number }
  }> = new EventEmitter();

  @Output() public switchList: EventEmitter<{
    src: { itemIndex: number, listIndex: number },
    dst: { listIndex: number }
  }> = new EventEmitter();


  @HostListener('dragenter', ['$event']) public dragEnter($event) {
    this.currentlyIn = true;
  }

  @HostListener('dragleave', ['$event']) public dragLeave($event) {
    this.currentlyIn = false;
  }

  @HostListener('drop', ['$event']) public drop($event) {
    const [ targetItemIndex, targetListIndex, srcItemIndex, srcListIndex ] = [
      $event.target.getAttribute('item-index'),
      $event.target.getAttribute('list-index'),
      $event.dataTransfer.getData('item-index'),
      $event.dataTransfer.getData('list-index')
    ];

    if (targetItemIndex && targetListIndex === srcListIndex) {
      this.switchItem.emit({
        src: {
          itemIndex: srcItemIndex,
          listIndex: srcListIndex
        },
        dst: {
          itemIndex: targetItemIndex,
          listIndex: targetListIndex
        }
      });
    } else if (!targetItemIndex) {
     this.switchList.emit({
        src: {
          itemIndex: srcItemIndex,
          listIndex: srcListIndex
        },
        dst: {
          listIndex: targetListIndex
        }
     });
    }
    $event.dataTransfer.clearData();
    this.currentlyIn = false;
  }

  @HostListener('dragover', ['$event']) public dragOver($event) {
    $event.preventDefault();
  }

  @HostListener('dragend') public dragEnd() {
    this.currentlyIn = false;

  }

  @HostListener('dragstart', ['$event']) public dragStart($event) {
    $event.dataTransfer.setData('item-index', $event.target.getAttribute('item-index'));
    $event.dataTransfer.setData('list-index', $event.target.getAttribute('list-index'));
  }

  constructor(
    private el: ElementRef
  ) {}

}
