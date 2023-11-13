import {
  trigger,
  transition,
  style,
  animate,
  group,
  stagger,
  query,
  state,
} from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
  transition(
    'addNewSong => *, songs => *, register => *, login => *, home => *, verses => *, addNewVerse => *',
    [
      // set default settings
      group([
        query(
          ':leave',
          [
            style({
              display: 'block',
            }),
          ],
          { optional: true }
        ),
        query(
          ':enter',
          [
            style({
              display: 'none',
              position: 'relative',
            }),
          ],
          { optional: true }
        ),
        query(
          '.transition-section',
          [
            style({
              display: 'none',
            }),
          ],
          {
            optional: true,
          }
        ),
        query(
          '.stagger-divs',
          [
            style({
              transform: 'translateY(100%)',
            }),
          ],
          {
            optional: true,
          }
        ),
      ]),

      query(
        '.transition-section',
        [
          style({
            display: 'flex',
          }),
        ],
        {
          optional: true,
        }
      ),
      // init transition
      query(
        '.stagger-divs',
        [
          stagger(-70, [
            animate(
              '0.5s cubic-bezier(.75, 0, .25, 1)',
              style({
                borderBottomLeftRadius: '5px',
                borderBottomRightRadius: '5px',
                transform: 'translateY(0)',
              })
            ),
          ]),
        ],
        {
          optional: true,
        }
      ),

      // change routes
      group([
        query(':leave', style({ display: 'none' }), {
          optional: true,
        }),
        query(':enter', style({ display: 'block' }), {
          optional: true,
        }),
      ]),

      // stagger transition
      query(
        '.stagger-divs',
        [
          stagger(70, [
            animate(
              '0.5s cubic-bezier(.75, 0, .25, 1)',
              style({
                borderBottomLeftRadius: '5px',
                borderBottomRightRadius: '5px',
                transform: 'translateY(-100%)',
              })
            ),
          ]),
        ],
        {
          optional: true,
        }
      ),

      // end transition
      query('.transition-section', style({ display: 'none' }), {
        optional: true,
      }),
    ]
  ),
]);

export const changeNav = trigger('changeNav', [
  state(
    'true',
    style({
      color: 'white',
    })
  ),
  state('false', style({ color: 'black' })),
  transition('true <=> false', [animate('0.1s 1.5s')]),
]);
