import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <div class="pane"></div>
        <div class="content">
            <div class="canvas">
                <div *ngFor="let value of values"
                     class="tile"
                     [ngClass]="'size' + value % 3">
                </div>
            </div>
        </div>
    `,
    styles: [`
        :host {
            height: 100%;
            width: 100%;
            display: flex;
        }
        .pane {
            background-color: #E2E2E2;
            width: 250px;
            flex-shrink: 0;
        }
        .content {
            flex-grow: 1;
            overflow-x: scroll;
            position: relative;
        }
        .canvas {
            flex-flow: column wrap;
            display: flex;
            align-content: flex-start;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 10px;
        }
        .tile {
            width: 200px;
            background-color: #B5B5B5;
            margin: 10px;
        }
        .size0 {
            height: 200px;
        }
        .size1 {
            height: 300px;
        }
        .size2 {
            height: 400px;
        }
    `]
})
export class AppComponent implements OnInit {
    values: number[];

    ngOnInit(): void {
        this.values = [];
        for (let i = 0; i < 20; i++) {
            this.values.push(Math.floor(Math.random() * 10));
        }
    }
}
