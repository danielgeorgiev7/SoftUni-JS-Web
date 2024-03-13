import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

type MyVoid = () => void;

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit, OnDestroy {
  // @HostListener('mouseover', ['$event']) mouseOverHandler(e: MouseEvent) {
  //   console.log('mouseover', e);
  // }

  unsubFromEventsArray: MyVoid[] = [];

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  mouseEnterHandler(e: MouseEvent): void {
    // setting styles
    // this.renderer.setStyle(this.elRef.nativeElement, 'background', 'khaki');

    // setting classes
    this.renderer.addClass(this.elRef.nativeElement, 'highlight');
  }
  mouseLeaveHandler(e: MouseEvent): void {
    // setting styles
    // this.renderer.setStyle(this.elRef.nativeElement, 'background', 'initial');

    // setting classes
    this.renderer.removeClass(this.elRef.nativeElement, 'highlight');
  }

  ngOnInit(): void {
    // console.log(this.elRef.nativeElement);

    // bad practice
    // this.elRef.nativeElement.style.background = 'orange';

    // good practice
    // this.renderer.setStyle(this.elRef.nativeElement, 'background', 'khaki');

    const mouseEnterEvent = this.renderer.listen(
      this.elRef.nativeElement,
      'mouseenter',
      this.mouseEnterHandler.bind(this)
    );

    const mouseLeaveEvent = this.renderer.listen(
      this.elRef.nativeElement,
      'mouseleave',
      this.mouseLeaveHandler.bind(this)
    );

    this.unsubFromEventsArray.push(mouseEnterEvent);
    this.unsubFromEventsArray.push(mouseLeaveEvent);
  }

  ngOnDestroy(): void {
    console.log('On destroy invoked');
    this.unsubFromEventsArray.forEach((eventFn) => eventFn());
  }
}
