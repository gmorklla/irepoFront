import {
    trigger,
    style,
    transition,
    animate,
    keyframes,
    query,
    stagger,
    state,
    group
} from '@angular/animations';

export const animations = {
    showing: trigger('showing', [
        transition('* => *', [
            query(':enter', style({ opacity: 0 }), {optional: true}),
            query(':enter',
            stagger('300ms', [
                animate('.6s ease-in',
                keyframes([
                    style({opacity: 0, offset: 0}),
                    style({opacity: .5, offset: 0.3}),
                    style({opacity: 1, offset: 1.0}),
                ])
                )
            ]),
            {optional: true})
        ])
    ]),
    appear: trigger('appear', [
        state('inactive', style({
          opacity: 0,
          transform: 'translateY(30%)'
        })),
        state('active', style({
          opacity: 1,
          transform: 'translateY(0)'
        })),
        transition('inactive => active', animate('500ms ease-out')),
        transition('active => inactive', animate('500ms ease-out'))
    ]),
    chip: trigger('chip', [
        state('selected',
          style({
            opacity: 1,
            backgroundColor: 'rgba(255, 255, 255, 1)'
          })
        ),
        transition('selected => *', [
            animate('300ms ease-in')
        ]),
        state('not',
            style({
                opacity: 0.5,
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
            })),
        transition('not => *', [
            animate('300ms ease-in')
        ]),
    ]),
    back: trigger('back', [
        state('inactive', style({
          opacity: 0,
          transform: 'scale(1.2)'
        })),
        state('active', style({
          opacity: 1,
          transform: 'scale(1)'
        })),
        transition('inactive => active', animate('500ms ease-out')),
        transition('active => inactive', animate('500ms ease-out'))
    ]),
    hover: trigger('selected', [
        state('selected',
          style({
            backgroundColor: 'rgba(255, 255, 255, 1)'
          })
        ),
        transition('selected => *', [
            animate('300ms ease-in')
        ]),
        state('not',
            style({
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
            })),
        transition('not => *', [
            animate('300ms ease-in')
        ]),
    ]),
};
