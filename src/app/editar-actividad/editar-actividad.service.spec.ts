import { TestBed } from '@angular/core/testing';

import { EditarActividadService } from './editar-actividad.service';

describe('EditarActividadService', () => {
  let service: EditarActividadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditarActividadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
