import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreFabricationFormComponent } from './ordre-fabrication-form.component';

describe('OrdreFabricationFormComponent', () => {
  let component: OrdreFabricationFormComponent;
  let fixture: ComponentFixture<OrdreFabricationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdreFabricationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdreFabricationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
