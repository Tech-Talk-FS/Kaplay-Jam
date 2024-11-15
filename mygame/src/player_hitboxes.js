export function getHitboxes() {
    return {
        sword: {
            Down: {
                anchor: "top",
                active: {
                    from: 1,
                    to: 2,
                },
                area: {
                    shape: new Rect(vec2(0, 5), 22, 16)
                }
            },
            Up: {
                anchor: "bot",
                active: {
                    from: 1,
                    to: 2,
                },
                area: {
                    shape: new Rect(vec2(0, 0), 22, 16)
                }
            },
            Left: {
                anchor: "right",
                active: {
                    from: 1,
                    to: 2,
                },
                area: {
                    shape: new Rect(vec2(1, 3), 19, 20)
                }
            },
            Right: {
                anchor: "left",
                active: {
                    from: 1,
                    to: 2,
                },
                area: {
                    shape: new Rect(vec2(-1, 3), 19, 20)
                }
            }
        },
        pickaxe: {
            Down: {
                anchor: "top",
                active: {
                    from: 2,
                    to: 3,
                },
                area: {
                    shape: new Rect(vec2(0, 0), 10, 15)
                }
            },
            Up: {
                anchor: "bot",
                active: {
                    from: 2,
                    to: 3,
                },
                area: {
                    shape: new Rect(vec2(3, 0), 10, 15)
                }
            },
            Left: {
                anchor: "right",
                active: {
                    from: 2,
                    to: 3,
                },
                area: {
                    shape: new Rect(vec2(0, 0), 16, 15)
                }
            },
            Right: {
                anchor: "left",
                active: {
                    from: 2,
                    to: 3,
                },
                area: {
                    shape: new Rect(vec2(0, 0), 16, 15)
                }
            }
        },
        axe: {
            Down: {
                anchor: "top",
                active: {
                    from: 2,
                    to: 3,
                },
                area: {
                    shape: new Rect(vec2(0, 0), 10, 15)
                }
            },
            Up: {
                anchor: "bot",
                active: {
                    from: 2,
                    to: 3,
                },
                area: {
                    shape: new Rect(vec2(3, 0), 10, 15)
                }
            },
            Left: {
                anchor: "right",
                active: {
                    from: 2,
                    to: 3,
                },
                area: {
                    shape: new Rect(vec2(0, 0), 17, 15)
                }
            },
            Right: {
                anchor: "left",
                active: {
                    from: 2,
                    to: 3,
                },
                area: {
                    shape: new Rect(vec2(0, 0), 17, 15)
                }
            }
        },
        sickle: {
            Down: {
                anchor: "top",
                active: {
                    from: 2,
                    to: 3,
                },
                area: {
                    shape: new Rect(vec2(-2, 5), 13, 12)
                }
            },
            Up: {
                anchor: "bot",
                active: {
                    from: 2,
                    to: 3,
                },
                area: {
                    shape: new Rect(vec2(6, 0), 13, 12)
                }
            },
            Left: {
                anchor: "right",
                active: {
                    from: 2,
                    to: 3,
                },
                area: {
                    shape: new Rect(vec2(0, 3), 15, 8)
                }
            },
            Right: {
                anchor: "left",
                active: {
                    from: 2,
                    to: 3,
                },
                area: {
                    shape: new Rect(vec2(0, 3), 15, 8)
                }
            }
        },
        spear: {
            Down: {
                anchor: "top",
                active: {
                    from: 2,
                    to: 3,
                },
                area: {
                    shape: new Rect(vec2(-2, 5), 10, 20)
                }
            },
            Up: {
                anchor: "bot",
                active: {
                    from: 2,
                    to: 3,
                },
                area: {
                    shape: new Rect(vec2(1, 0), 10, 20)
                }
            },
            Left: {
                anchor: "right",
                active: {
                    from: 2,
                    to: 3,
                },
                area: {
                    shape: new Rect(vec2(0, 5), 24, 8)
                }
            },
            Right: {
                anchor: "left",
                active: {
                    from: 2,
                    to: 3,
                },
                area: {
                    shape: new Rect(vec2(0, 5), 24, 8)
                }
            }
        },
        interact: {
            Down: {
                rotate: 90
            },
            Up: {
                rotate: 270
            },
            Left: {
                rotate: 180
            },
            Right: {
                area: {
                    shape: new Rect(vec2(0, 0), 17, 22)
                },
                rotate: 0
            }
        }
    }
}