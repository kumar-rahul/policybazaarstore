import { TestBed, async, inject } from '@angular/core/testing';

import { SelectedcartGuard } from './selectedcart.guard';

describe('SelectedcartGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedcartGuard]
    });
  });

  it('should ...', inject([SelectedcartGuard], (guard: SelectedcartGuard) => {
    expect(guard).toBeTruthy();
  }));
});
