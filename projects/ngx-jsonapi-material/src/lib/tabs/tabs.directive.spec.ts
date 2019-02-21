import { JamTabsDirective } from './tabs.directive';
import { of as observableOf } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { mock, instance, when } from 'ts-mockito';

const RouterMock = mock(Router);
let selectedIndexChangeEmitter = new EventEmitter<number>();
const ActivatedRouteMock = mock(ActivatedRoute);
let queryParams: {} = { tab_selected: 'first' };
let queryParams_second: {} = {};
when(ActivatedRouteMock.queryParams).thenReturn(observableOf(queryParams), observableOf(queryParams_second));

describe('JamTabsDirective', () => {
    let directive: JamTabsDirective;
    it('should create an instance', () => {
        directive = new JamTabsDirective(instance(RouterMock), instance(ActivatedRouteMock));
        expect(directive).toBeTruthy();
    });
    it('should update the selected tab in MatTabGroup when the view loads in AfterViewInit', () => {
        directive.tabNames = { 'first': 0, 'second': 1 };
        directive.defaultTabIndex = 1;
        (directive.tabGroup as any) = { selectedIndex: null, selectedIndexChange: selectedIndexChangeEmitter };
        directive.ngAfterViewInit();
        expect(directive.tabGroup.selectedIndex).toBe(0);
    });
    it('if tab_selected query param is not present, defaultTabIndex should be used', () => {
        directive = new JamTabsDirective(instance(RouterMock), instance(ActivatedRouteMock));
        directive.tabNames = { 'first': 0, 'second': 1 };
        directive.defaultTabIndex = 1;
        (directive.tabGroup as any) = { selectedIndex: null, selectedIndexChange: selectedIndexChangeEmitter };
        directive.ngAfterViewInit();
        expect(directive.tabGroup.selectedIndex).toBe(1);
    });
    it('onTabChange should call router naveigate with the new query params', () => {
        let navigate_spy = spyOn((directive as any).router, 'navigate');
        directive.onTabChange(0);
        expect(navigate_spy).toHaveBeenCalledWith([], { queryParams: { tab_selected: 'first' }});
    });
});
