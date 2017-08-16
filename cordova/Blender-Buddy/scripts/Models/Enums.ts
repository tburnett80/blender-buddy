
enum TopOffGas {
    Air = 0,
    Ean32,
    Ean36,
    //TODO: add trimix blends here
    Custom
}

(window as { TopOffGas?}).TopOffGas = TopOffGas;

enum MeasureMode {
    Imperial = 0,
    Metric
}

(window as { MeasureMode?}).MeasureMode = MeasureMode;