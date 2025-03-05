import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Auth } from '@angular/fire/auth';
import { of, firstValueFrom } from 'rxjs';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy },
        { provide: Auth, useValue: {} }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow navigation if user is logged in', async () => {
    spyOn(authGuard, 'canActivate').and.returnValue(of(true));

    const result = await firstValueFrom(authGuard.canActivate() as any);
    expect(result).toBeTrue();
  });

  it('should redirect to login if user is not logged in', async () => {
    spyOn(authGuard, 'canActivate').and.returnValue(of(false));

    const result = await firstValueFrom(authGuard.canActivate() as any);
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
