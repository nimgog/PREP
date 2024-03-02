import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';

// TODO: Fill other metadata
export const routeMeta: RouteMeta = {
  title: 'About Us | PREP',
};

@Component({
  selector: 'app-about-us-page', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  template: `
    <div class="w-full h-full pt-32">
      <div class="flex flex-col sm:flex-row-reverse">
        <div>[BACKPACK IMAGE]</div>

        <div>
          <div class="uppercase">Our Purpose</div>

          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea esse
            atque asperiores similique nostrum quas nulla blanditiis sint optio
            corporis! Eos sint ea officiis delectus vel ipsum ipsam blanditiis
            amet. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea
            esse atque asperiores similique nostrum quas nulla blanditiis sint
            optio corporis! Eos sint ea officiis delectus vel ipsum ipsam
            blanditiis amet.<br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea esse
            atque asperiores similique nostrum quas nulla blanditiis sint optio
            corporis! Eos sint ea officiis delectus vel ipsum ipsam blanditiis
            amet. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea
            esse atque asperiores similique nostrum quas nulla blanditiis sint
            optio corporis! Eos sint ea officiis delectus vel ipsum ipsam
            blanditiis amet.
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row">
        <div>
          <div class="uppercase">Let's Talk</div>

          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            esse qui sequi rerum ducimus at libero hic beatae in iste?
          </div>

          <div>[MAP]</div>
        </div>

        <div>
          <div>
            <div>Name *</div>
            <input />
          </div>

          <div>
            <div>Email *</div>
            <input type="email" />
          </div>

          <div>
            <div>Message *</div>
            <textarea></textarea>
          </div>

          <div>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class AboutUsPageComponent {}
