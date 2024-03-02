import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';

// TODO: Fill other metadata
export const routeMeta: RouteMeta = {
  title: 'Survival Kit | PREP',
};

@Component({
  selector: 'app-survival-kit-page', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  template: `
    <div class="w-full h-full pt-32">
      <div>Survival Kit</div>

      <hr />

      <div class="flex flex-col sm:flex-row">
        <div>
          <div>[SELECTED IMAGE]</div>

          <div>[AVAILABLE IMAGES THUMBNAILS]</div>
        </div>

        <div>
          <div>[PRICE - DISCOUNT - KLARNA]</div>

          <div>[RANDOM SWEDISH TEXT]</div>

          <div class="flex">
            <div><input type="number" /></div>

            <div>
              <button>Add to cart</button>
            </div>
          </div>

          <div>Product Description</div>

          <hr />

          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Reprehenderit vel modi quae adipisci ipsum quia et asperiores itaque
            magnam vitae. Laboriosam adipisci iure aliquam eaque nihil.
            Similique, repellat at? Adipisci. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Reprehenderit vel modi quae adipisci
            ipsum quia et asperiores itaque magnam vitae. Laboriosam adipisci
            iure aliquam eaque nihil. Similique, repellat at? Adipisci.
          </div>

          <table>
            <thead>
              <th>Type</th>
              <th>Amount</th>
            </thead>
            <tbody>
              <tr>
                <td>Whistle</td>
                <td>2</td>
              </tr>

              <tr>
                <td>Compass</td>
                <td>1</td>
              </tr>

              <tr>
                <td>Knives</td>
                <td>4</td>
              </tr>
            </tbody>
          </table>

          <div>Shipping</div>

          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            deleniti et amet maxime, veritatis quia laboriosam illum repudiandae
            rem quidem delectus magnam quisquam soluta consectetur:
          </div>

          <ul>
            <li>
              * Lorem: ipsum dolor sit amet consectetur adipisicing elit.
              Aperiam deleniti et amet maxime
            </li>
            <li>
              * Lorem: ipsum dolor sit amet consectetur adipisicing elit.
              Aperiam deleniti et amet maxime
            </li>
          </ul>
        </div>
      </div>

      <div>FAQ</div>

      <div>[FAQ LIST]</div>
    </div>
  `,
})
export default class SurvivalKitPageComponent {}
