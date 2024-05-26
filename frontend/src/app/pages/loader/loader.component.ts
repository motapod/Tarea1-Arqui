import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'loader',
  template: `
    <div
      class="text-center d-flex align-items-center justify-content-center w-100 h-100"
    >
      <span class="badge">
        <img
          src="assets/img/loader.svg"
          alt="adjust_filter_icon"
          style="height: 100px"
        />
      </span>
    </div>
  `,
})
export class Loader {}
