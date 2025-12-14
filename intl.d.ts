declare namespace Intl {
    interface Locale {
        getWeekInfo(): {
            firstDay: 1 | 2 | 3 | 4 | 5 | 6 | 7;
            weekend: number[];
            minimalDays: 1 | 2 | 3 | 4 | 5 | 6 | 7;
        };
    }
}