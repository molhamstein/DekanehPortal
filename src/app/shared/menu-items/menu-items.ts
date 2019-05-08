import { Injectable } from '@angular/core';
import { ConstService } from '../../services/const.service';

export interface BadgeItem {
    type: string;
    value: string;
}

export interface ChildrenItems {
    state: string;
    target?: boolean;
    name: string;
    type?: string;
    children?: ChildrenItems[];
}

export interface MainMenuItems {
    state: string;
    short_label?: string;
    main_state?: string;
    target?: boolean;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    children?: ChildrenItems[];
}

export interface Menu {
    label: string;
    main: MainMenuItems[];
}

@Injectable()
export class MenuItems {
    wholesaleMENUITEMS = [
        {
            label: '',
            main: [
                {
                    state: 'manufacturers',
                    short_label: 'M',
                    name: 'mainMenu.Manufacturers.main',
                    type: 'custom',
                    icon: 'ti-user',
                    children: [

                    ]
                }
            ]
        },
        {
            label: 'mainMenu.main',
            main: [
                {
                    state: 'manufacturers',
                    short_label: 'M',
                    name: 'mainMenu.Manufacturers.main',
                    type: 'sub',
                    icon: 'ti-user',
                    children: [
                        {
                            state: 'add',
                            name: 'mainMenu.Manufacturers.add'
                        }, {
                            state: 'view',
                            name: 'mainMenu.Manufacturers.viewAll'
                        }
                    ]
                },
                {
                    state: 'topSlider',
                    short_label: 'F',
                    name: 'mainMenu.topSlider.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'new',
                            name: 'mainMenu.topSlider.add'
                        }, {
                            state: 'list',
                            name: 'mainMenu.topSlider.viewAll'
                        }
                    ]
                },
                {
                    state: 'client',
                    short_label: 'F',
                    name: 'mainMenu.Clients.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'new',
                            name: 'mainMenu.Clients.add'
                        }, {
                            state: 'list',
                            name: 'mainMenu.Clients.viewAll'
                        }
                    ]
                },
                {
                    state: 'orders',
                    short_label: 'O',
                    name: 'mainMenu.Orders.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'report',
                            name: 'mainMenu.Orders.report'
                        },
                        {
                            state: 'management',
                            name: 'mainMenu.Orders.Management'
                        }
                    ]
                },
                {
                    state: 'supplier-orders',
                    short_label: 'O',
                    name: 'mainMenu.SupplierOrders.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'list',
                            name: 'mainMenu.SupplierOrders.viewAll'
                        },
                        {
                            state: 'report',
                            name: 'mainMenu.SupplierOrders.report'
                        },
                        {
                            state: 'new',
                            name: 'mainMenu.SupplierOrders.add'
                        }
                    ]
                },
                {
                    state: 'products',
                    short_label: 'F',
                    name: 'mainMenu.Products.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'new',
                            name: 'mainMenu.Products.add'
                        }, {
                            state: 'list',
                            name: 'mainMenu.Products.viewAll'
                        }
                    ]
                },
                {
                    state: 'abstract-products',
                    short_label: 'F',
                    name: 'mainMenu.AbstractProducts.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'new',
                            name: 'mainMenu.AbstractProducts.add'
                        }, {
                            state: 'list',
                            name: 'mainMenu.AbstractProducts.viewAll'
                        }
                    ]
                },
                {
                    state: 'categories',
                    short_label: 'F',
                    name: 'mainMenu.Categories.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'add',
                            name: 'mainMenu.Categories.add'
                        },
                        {
                            state: 'viewAll',
                            name: 'mainMenu.Categories.viewAll'
                        },
                    ]
                },
                {
                    state: 'areas',
                    short_label: 'F',
                    name: 'mainMenu.areas.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'new',
                            name: 'mainMenu.areas.add'
                        },
                        {
                            state: 'list',
                            name: 'mainMenu.areas.viewAll'
                        },
                    ]
                },
                {
                    state: 'coupons',
                    short_label: 'F',
                    name: 'mainMenu.coupons.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'new',
                            name: 'mainMenu.coupons.add'
                        },
                        {
                            state: 'list',
                            name: 'mainMenu.coupons.viewAll'
                        },
                    ]
                },
                {
                    state: 'staff',
                    short_label: 'F',
                    name: 'mainMenu.Staff.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'add-on',
                            name: 'mainMenu.Staff.add'
                        },
                        {
                            state: 'list',
                            name: 'mainMenu.Staff.viewAll'
                        }
                    ]
                },
                {
                    state: 'suppliers',
                    short_label: 'F',
                    name: 'mainMenu.Supplier.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'add',
                            name: 'mainMenu.Supplier.add'
                        },
                        {
                            state: 'list',
                            name: 'mainMenu.Supplier.viewAll'
                        }
                    ]
                },
                {
                    state: 'ratings',
                    short_label: 'F',
                    name: 'mainMenu.Ratings.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'list',
                            name: 'mainMenu.Ratings.viewAll'
                        },
                    ]
                },
                {
                    state: 'notifications',
                    short_label: 'F',
                    name: 'mainMenu.Notifications.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'add',
                            name: 'mainMenu.Notifications.viewAll'
                        },
                    ]
                },
                {
                    state: 'reports',
                    short_label: 'F',
                    name: 'mainMenu.Reports.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'warning',
                            name: 'mainMenu.Reports.warning'
                        },
                    ]
                },
                {
                    state: 'damaged',
                    short_label: 'F',
                    name: 'mainMenu.Damaged.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'list',
                            name: 'mainMenu.Damaged.viewAll'
                        },
                        {
                            state: 'add',
                            name: 'mainMenu.Damaged.add'
                        },
                        {
                            state: 'report',
                            name: 'mainMenu.Damaged.report'
                        },
                    ]
                }
            ]
        },
    ];

    salesMENUITEMS = [
        {
            label: '',
            main: [
                {
                    state: 'manufacturers',
                    short_label: 'M',
                    name: 'mainMenu.Manufacturers.main',
                    type: 'custom',
                    icon: 'ti-user',
                    children: [

                    ]
                }
            ]
        },
        {
            label: 'mainMenu.main',
            main: [
                {
                    state: 'manufacturers',
                    short_label: 'M',
                    name: 'mainMenu.Manufacturers.main',
                    type: 'sub',
                    icon: 'ti-user',
                    children: [
                        {
                            state: 'add',
                            name: 'mainMenu.Manufacturers.add'
                        }, {
                            state: 'view',
                            name: 'mainMenu.Manufacturers.viewAll'
                        }
                    ]
                },
                {
                    state: 'topSlider',
                    short_label: 'F',
                    name: 'mainMenu.topSlider.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'new',
                            name: 'mainMenu.topSlider.add'
                        }, {
                            state: 'list',
                            name: 'mainMenu.topSlider.viewAll'
                        }
                    ]
                },
                {
                    state: 'client',
                    short_label: 'F',
                    name: 'mainMenu.Clients.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'new',
                            name: 'mainMenu.Clients.add'
                        }, {
                            state: 'list',
                            name: 'mainMenu.Clients.viewAll'
                        }
                    ]
                },
                {
                    state: 'orders',
                    short_label: 'O',
                    name: 'mainMenu.Orders.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'report',
                            name: 'mainMenu.Orders.report'
                        },
                        {
                            state: 'management',
                            name: 'mainMenu.Orders.Management'
                        }
                    ]
                },
                {
                    state: 'supplier-orders',
                    short_label: 'O',
                    name: 'mainMenu.SupplierOrders.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'list',
                            name: 'mainMenu.SupplierOrders.viewAll'
                        },
                        {
                            state: 'report',
                            name: 'mainMenu.SupplierOrders.report'
                        },
                        {
                            state: 'new',
                            name: 'mainMenu.SupplierOrders.add'
                        }
                    ]
                },
                {
                    state: 'products',
                    short_label: 'F',
                    name: 'mainMenu.Products.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'new',
                            name: 'mainMenu.Products.add'
                        }, {
                            state: 'list',
                            name: 'mainMenu.Products.viewAll'
                        }
                    ]
                },
                {
                    state: 'abstract-products',
                    short_label: 'F',
                    name: 'mainMenu.AbstractProducts.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'new',
                            name: 'mainMenu.AbstractProducts.add'
                        }, {
                            state: 'list',
                            name: 'mainMenu.AbstractProducts.viewAll'
                        }
                    ]
                },
                {
                    state: 'categories',
                    short_label: 'F',
                    name: 'mainMenu.Categories.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'add',
                            name: 'mainMenu.Categories.add'
                        },
                        {
                            state: 'viewAll',
                            name: 'mainMenu.Categories.viewAll'
                        },
                    ]
                },
                {
                    state: 'areas',
                    short_label: 'F',
                    name: 'mainMenu.areas.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'new',
                            name: 'mainMenu.areas.add'
                        },
                        {
                            state: 'list',
                            name: 'mainMenu.areas.viewAll'
                        },
                    ]
                },
                {
                    state: 'coupons',
                    short_label: 'F',
                    name: 'mainMenu.coupons.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'new',
                            name: 'mainMenu.coupons.add'
                        },
                        {
                            state: 'list',
                            name: 'mainMenu.coupons.viewAll'
                        },
                    ]
                },
                {
                    state: 'staff',
                    short_label: 'F',
                    name: 'mainMenu.Staff.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'list',
                            name: 'mainMenu.Staff.viewAll'
                        }
                    ]
                },
                {
                    state: 'suppliers',
                    short_label: 'F',
                    name: 'mainMenu.Supplier.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'add',
                            name: 'mainMenu.Supplier.add'
                        },
                        {
                            state: 'list',
                            name: 'mainMenu.Supplier.viewAll'
                        }
                    ]
                },
                {
                    state: 'ratings',
                    short_label: 'F',
                    name: 'mainMenu.Ratings.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'list',
                            name: 'mainMenu.Ratings.viewAll'
                        },
                    ]
                },
                {
                    state: 'notifications',
                    short_label: 'F',
                    name: 'mainMenu.Notifications.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'add',
                            name: 'mainMenu.Notifications.viewAll'
                        },
                    ]
                },
                {
                    state: 'reports',
                    short_label: 'F',
                    name: 'mainMenu.Reports.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'warning',
                            name: 'mainMenu.Reports.warning'
                        },
                    ]
                },
                {
                    state: 'damaged',
                    short_label: 'F',
                    name: 'mainMenu.Damaged.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'list',
                            name: 'mainMenu.Damaged.viewAll'
                        },
                        {
                            state: 'add',
                            name: 'mainMenu.Damaged.add'
                        },
                        {
                            state: 'report',
                            name: 'mainMenu.Damaged.report'
                        },
                    ]
                }
            ]
        },
    ];

    wareHouseMENUITEMS = [
        {
            label: 'mainMenu.main',
            main: [

                {
                    state: 'supplier-orders',
                    short_label: 'O',
                    name: 'mainMenu.SupplierOrders.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'list',
                            name: 'mainMenu.SupplierOrders.viewAll'
                        }
                    ]
                },
                {
                    state: 'abstract-products',
                    short_label: 'F',
                    name: 'mainMenu.AbstractProducts.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'list',
                            name: 'mainMenu.AbstractProducts.viewAll'
                        }
                    ]
                },

                {
                    state: 'reports',
                    short_label: 'F',
                    name: 'mainMenu.Reports.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'warning',
                            name: 'mainMenu.Reports.warning'
                        },
                    ]
                },
                {
                    state: 'damaged',
                    short_label: 'F',
                    name: 'mainMenu.Damaged.main',
                    type: 'sub',
                    icon: 'ti-layers',
                    children: [
                        {
                            state: 'list',
                            name: 'mainMenu.Damaged.viewAll'
                        },
                        {
                            state: 'report',
                            name: 'mainMenu.Damaged.report'
                        },
                    ]
                }
            ]
        },
    ];

    constructor(private constant: ConstService) {
    }

    getAll(): Menu[] {
        if (localStorage.getItem('clientType') == 'admin')
            return this.wholesaleMENUITEMS;
        else if (localStorage.getItem('clientType') == 'sales')
            return this.salesMENUITEMS;
        else if (localStorage.getItem('clientType') == 'warehouseKeeper') {
            return this.wareHouseMENUITEMS;
        }
    }

    /*add(menu: Menu) {
      MENUITEMS.push(menu);
    }*/
}
