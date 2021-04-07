import { async, ComponentFixture, TestBed, getTestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { MyService } from './app.service';
import { AppModule } from './app.module';

import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('MyService', () => {
    let injector: TestBed;
    let service: MyService;
    let httpMock: HttpTestingController

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [MyService]
            }).compileComponents().then(() => {
                injector = getTestBed();
                service = injector.inject(MyService);
                httpMock = injector.inject(HttpTestingController);
            });
        })
    );

    it('should create app service', () => {
        expect(service).toBeTruthy();
    });

    const dummyToDoListResponse = {
        data: [
            { id: 1, title: 'abc', isDone: false, editing: false },
            { id: 2, title: 'def', isDone: false, editing: false },
            { id: 3, title: 'ghi', isDone: false, editing: false },
        ],
    };

    // Testing service call
    it('should getToDo() and return data', () => {
        service.getToDo().subscribe((res) => {
            expect(res).toEqual(dummyToDoListResponse);
        });

        const req = httpMock.expectOne('http://localhost:3000/api/todo');
        expect(req.request.method).toBe('GET');
        req.flush(dummyToDoListResponse);
    });

    afterEach(() => {
        httpMock.verify();
    });
});

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [AppModule],
                declarations: [AppComponent]
            }).compileComponents().then(() => {
                fixture = TestBed.createComponent(AppComponent);

                component = fixture.componentInstance;

                de = fixture.debugElement.query(By.css('#main'));

                el = de.nativeElement;
            });
        })
    );

    // Testing component creation
    it("should create app component", () => {
        expect(component).toBeTruthy();
    });

    // Testing HTML element
    it('should have a button with a copy of `submit`', () => {
        const btn = fixture.debugElement.query(By.css('.submit')).nativeElement;
        expect(btn.innerHTML).toBe('Submit');
    })

    // Testing a component
    it("should call addNewItem method on todo submit", () => {
        fixture.detectChanges();
        spyOn(component, 'addNewItem');
        component.myGroup.controls.newTodo.setValue('test');
        el = fixture.debugElement.query(By.css('.submit')).nativeElement;
        el.click();
        expect(component.addNewItem).toHaveBeenCalledTimes(1);
    });
});
