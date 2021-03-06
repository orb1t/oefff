import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureDetailDisplayComponent } from './feature-detail-display.component';
import {FeatureService, MockFeatureService} from "../feature.service";
import {ActivatedRoute} from "@angular/router";
import {MockActivatedRoute, MockParams} from "../../test-support/ActivatedRouteTest";

describe('FeatureDetailDisplayComponent', () => {
  let component: FeatureDetailDisplayComponent;
  let fixture: ComponentFixture<FeatureDetailDisplayComponent>;

  beforeEach(async(() => {
      let mockFeatureService = new MockFeatureService({name: 'Mocked That Thing!', description:'', children: []});

      const mockParams = new MockParams({ projecy: 'one', epic: 'two', feature: 'three' });


      TestBed.configureTestingModule({
      declarations: [ FeatureDetailDisplayComponent ],
        providers: [
            {
              provide: 'FeatureService', useValue: mockFeatureService,

            }, {provide: ActivatedRoute, useValue: new MockActivatedRoute(mockParams)}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureDetailDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should read the feature using the FeatureService', () => {
    component.ngOnInit();
    expect(component.feature.name).toBe("Mocked That Thing!");
  });
});
