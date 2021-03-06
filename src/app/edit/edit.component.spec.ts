///<reference path="../shared/search/mocks/routes.ts"/>
/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { EditComponent } from './edit.component';
import { MockSearchService } from "../shared/search/mocks/search.service";
import { MockActivatedRoute, MockRouter } from "../shared/search/mocks/routes";
import { TestBed } from "@angular/core/testing/test_bed";
import { SearchService } from "../shared/search/search.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

describe('Component: Edit', () => {
  let mockSearchService: MockSearchService;
  let mockActivatedRoute: MockActivatedRoute;
  let mockRouter: MockRouter;

  beforeEach(() => {
    mockSearchService = new MockSearchService();
    mockActivatedRoute = new MockActivatedRoute({'id': 1});
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [EditComponent],
      providers: [
        {provide: SearchService, useValue: mockSearchService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Router, useValue: mockRouter}
      ],
      imports: [FormsModule]
    });
  });

  it('should fetch a single record', () => {
    const fixture = TestBed.createComponent(EditComponent);

    let person = {name: 'Emmanuel Sanders', address: {city: 'Denver'}};
    mockSearchService.setResponse(person);

    fixture.detectChanges();
    // verify service was called
    expect(mockSearchService.getByIdSpy).toHaveBeenCalledWith(1);

    // verify data was set on component when initialized
    let editComponent = fixture.debugElement.componentInstance;
    expect(editComponent.editAddress.city).toBe('Denver');

    // verify HTML renders as expected
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').innerHTML).toBe('Emmanuel Sanders');
  });

});
