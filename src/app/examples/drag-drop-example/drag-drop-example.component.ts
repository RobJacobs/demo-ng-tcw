import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-drop-example',
  templateUrl: './drag-drop-example.component.html',
  styleUrls: ['./drag-drop-example.component.scss']
})
export class DragDropExampleComponent implements OnInit {
  public items01 = [
    'List 1 - item 01',
    'List 1 - item 02',
    'List 1 - item 03',
    'List 1 - item 04'
  ];
  public items02 = [
    'List 2 - item 01',
    'List 2 - item 02',
    'List 2 - item 03',
    'List 2 - item 04'
  ];

  constructor() { }

  public ngOnInit(): void {
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
