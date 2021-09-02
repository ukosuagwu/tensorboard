/* Copyright 2020 The TensorFlow Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Store} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

import {State} from '../../app_state';
import {getIsTimeSeriesPromotionEnabled} from '../../selectors';
import {MetricsDashboardContainer} from './metrics_container';
import {MetricsPromoNoticeContainer} from './metrics_promo_notice_container';

describe('metrics view', () => {
  let store: MockStore<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [MetricsDashboardContainer, MetricsPromoNoticeContainer],
      providers: [provideMockStore()],
      // Ignore errors from components that are out-of-scope for this test:
      // 'runs-selector'.
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject<Store<State>>(Store) as MockStore<State>;
    store.overrideSelector(getIsTimeSeriesPromotionEnabled, false);
  });

  it('renders', () => {
    const fixture = TestBed.createComponent(MetricsDashboardContainer);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('runs-selector'))).not.toBeNull();
  });

  it('renders notice when promotion is enabled', () => {
    store.overrideSelector(getIsTimeSeriesPromotionEnabled, true);
    const fixture = TestBed.createComponent(MetricsDashboardContainer);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.notice'))).not.toBeNull();
  });
});
