import {IWidgetInstance} from "./widget.models";
export class WidgetPositionSortValueConverter {
  toView(array: IWidgetInstance[]): IWidgetInstance[] {
    return array.sort((a: IWidgetInstance, b: IWidgetInstance) => {
      if ((!a && b) || (!a.position && b.position)) {
        return -1;
      }
      if ((a && !b) || (a.position && !b.position)) {
        return 1;
      }
      if (a.position.y < b.position.y) {
        return -1;
      }
      if (a.position.y > b.position.y) {
        return 1;
      }
      if (a.position.y === b.position.y) {
        if (a.position.x < b.position.x) {
          return -1;
        }
        if (a.position.x > b.position.x) {
          return 1;
        }
        if (a.position.x === b.position.x) {
          return 0;
        }
      }

    });
  }
}
