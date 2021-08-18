import { addClass, isDefined } from '@tyler-components-web/core';
import { TableComponent, IMenuOption, MenuComponent } from '@tylertech/tyler-components-web';
import { ViewContainerRef, ComponentRef, EmbeddedViewRef, ComponentFactoryResolver, Type } from '@angular/core';

export class TableUtils {
  public static createLinkButton(label: string | number, clickHandler: (event) => void): HTMLButtonElement {
    const linkElement = document.createElement('button');
    addClass(['tyl-hyperlink'], linkElement);
    linkElement.innerText = label.toString();
    linkElement.type = 'button';
    linkElement.style.minWidth = '36px';
    linkElement.addEventListener('click', clickHandler);
    return linkElement;
  }

  public static createIconButton(icon: string, clickHandler: (event) => void, title?: string): HTMLElement {
    const tcwIconButtonElement = document.createElement('tcw-icon-button');

    const buttonElement = document.createElement('button');
    buttonElement.type = 'button';
    buttonElement.addEventListener('click', clickHandler);

    const tcwIconElement = document.createElement('tcw-icon');
    tcwIconElement.setAttribute('name', icon);
    addClass(['tyl-color-icon'], tcwIconElement);

    buttonElement.appendChild(tcwIconElement);
    tcwIconButtonElement.appendChild(buttonElement);

    if (title) {
      tcwIconButtonElement.title = title;
    }
    return tcwIconButtonElement;
  }

  public static createMenuButton(icon: string, selectHandler: (event) => void, options: IMenuOption[], title?: string): HTMLElement {
    const tcwMenuElement = document.createElement('tcw-menu') as MenuComponent;
    tcwMenuElement.options = options;
    tcwMenuElement.addEventListener('tcw-menu-select', selectHandler);

    const tcwIconButtonElement = document.createElement('tcw-icon-button');
    if (title) {
      tcwIconButtonElement.title = title;
    }

    const buttonElement = document.createElement('button');
    buttonElement.type = 'button';

    const tcwIconElement = document.createElement('tcw-icon');
    tcwIconElement.setAttribute('name', icon);
    addClass(['tyl-color-icon'], tcwIconElement);

    buttonElement.appendChild(tcwIconElement);
    tcwIconButtonElement.appendChild(buttonElement);
    tcwMenuElement.appendChild(tcwIconButtonElement);

    return tcwMenuElement;
  }

  public static createExpanderRow<T>(
    rowIndex: number,
    tableElement: TableComponent,
    viewContainerRef: ViewContainerRef,
    component: Type<T>,
    componentFactoryResolver: ComponentFactoryResolver,
    title?: string,
    data?: any
  ): HTMLElement {
    let componentRef: ComponentRef<any>;
    const expanderElement = TableUtils.createIconButton(
      'expand_more',
      () => {
        const isExpanded = tableElement.isRowExpanded(rowIndex);
        expanderElement.querySelector('button').innerText = isExpanded ? 'expand_more' : 'expand_less';
        if (isExpanded) {
          tableElement.collapseRow(rowIndex).then(() => {
            componentRef.destroy();
            componentRef = null;
          });
        } else {
          tableElement.expandRow(rowIndex, () => {
            componentRef = viewContainerRef.createComponent(componentFactoryResolver.resolveComponentFactory(component));
            componentRef.instance.rowIndex = rowIndex;
            if (isDefined(data)) {
              componentRef.instance.data = data;
            }
            const rootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
            rootNode.classList.add('tyl-table-expandable-row');
            return rootNode;
          });
        }
      },
      title
    );

    return expanderElement;
  }
}
