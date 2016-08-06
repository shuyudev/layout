import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <div class="pane"></div>
        <div class="content">
            <div *ngIf="horizontal" class="horizontal-canvas">
                <div *ngFor="let value of values"
                     class="tile"
                     [style.height.px]="value">
                </div>
            </div>
            <div *ngIf="!horizontal" class="vertical-canvas">
                <div *ngFor="let valueGroup of valueGroups" class="group">
                    <div *ngFor="let value of valueGroup"
                        class="tile"
                        [style.height.px]="value">
                    </div>
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

        .horizontal-canvas {
            display: flex;
            flex-flow: column wrap;
            align-content: flex-start;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 10px;
        }
        .vertical-canvas {
            width: 100%;
            display: flex;
            flex-flow: row wrap;
        }

        .tile {
            background-color: #B5B5B5;
            margin: 10px;
        }
        .horizontal-canvas .tile {
            width: 200px;
        }
        .vertical-canvas .group {
            width: 30%;
            min-width: 150px;
        }
    `]
})
export class AppComponent implements OnInit {
    private _valueCount = 20;
    private _groupCount = 3;

    horizontal: boolean;
    values: number[];
    valueGroups: number[][];

    ngOnInit(): void {
        this.horizontal = false;

        this.values = [];
        for (let i = 0; i < this._valueCount; i++) {
            this.values.push(Math.floor(100 + Math.random() * 300));
        }

        let groupSum: number[] = [];
        this.valueGroups = [];
        for (let i = 0; i < this._groupCount; i++) {
            this.valueGroups.push([]);
            groupSum.push(0);
        }

        for (let i = 0; i < this.values.length; i++) {
            let minSum = Number.MAX_SAFE_INTEGER;
            let index: number;
            for (let i = 0; i < this._groupCount; i++) {
                if (groupSum[i] < minSum) {
                    minSum = groupSum[i];
                    index = i;
                }
            }

            this.valueGroups[index].push(this.values[i]);
            groupSum[index] += this.values[i];
        }
    }
}
