import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <div class="pane"
            (click)="clickPane($event)">
            <span>click to switch between horizontal and vertical layout</span>
            <span>ctrl+click to refresh</span>
        </div>
        <div class="content">
            <div *ngIf="horizontal" class="horizontal-canvas">
                <div *ngFor="let value of values"
                     class="tile"
                     [style.height.px]="value">
                     height: {{value}}
                </div>
            </div>
            <div *ngIf="!horizontal"
                 class="vertical-canvas"
                 [style.height.px]="canvasHeight">
                <div *ngFor="let value of values"
                    class="tile"
                    [style.height.px]="value">
                    height: {{value}}
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
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            justify-content: space-around;
            background-color: #E2E2E2;
            width: 250px;
            flex-shrink: 0;
            padding: 10px;
        }
        .content {
            flex-grow: 1;
            overflow: auto;
            position: relative;
        }

        .horizontal-canvas {
            display: flex;
            flex-flow: column wrap;
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
            flex-flow: column wrap;
        }

        .tile {
            background-color: #B5B5B5;
            margin-bottom: 10px;
            margin-left: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .horizontal-canvas .tile {
            width: 200px;
        }
        .vertical-canvas .tile {
            width: 30%;
        }
    `]
})
export class AppComponent implements OnInit {
    private _valueCount = 20;
    private _columnCount = 3;
    private _tileMargin = 10;

    horizontal: boolean;
    values: number[];
    canvasHeight: number;

    ngOnInit(): void {
        this.horizontal = true;

        this.values = [];
        for (let i = 0; i < this._valueCount; i++) {
            this.values.push(Math.floor(100 + Math.random() * 300));
        }

        let totalHeight = this.values.reduce((x, y) => x + y + this._tileMargin*2);
        let columnHeight = totalHeight / this._columnCount;;
        while (true) {
            let column = 0;
            let remain = columnHeight;
            let fistUnfitNeed: number;
            let fistUnfitRemain: number;
            for (let i = 0; i < this._valueCount;) {
                let need = this.values[i] + this._tileMargin;
                if (remain - need >= 0) {
                    remain -= need;
                    i++;
                } else {
                    if (column === 0) {
                        fistUnfitNeed = need;
                        fistUnfitRemain = remain;
                    }
                    column++;
                    remain = columnHeight;
                    if (column >= this._columnCount) {
                        break;
                    }
                }
            }

            if (column < this._columnCount) {
                break;
            } else {
                columnHeight += (fistUnfitNeed - fistUnfitRemain);
            }
        }

        this.canvasHeight = columnHeight;
    }

    clickPane(event: MouseEvent): void {
        if (!event.ctrlKey) {
            this.horizontal = !this.horizontal;
        } else {
            this.ngOnInit();
        }
    }
}
