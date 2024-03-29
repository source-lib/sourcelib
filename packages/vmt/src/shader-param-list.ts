
import { ShaderParam } from "./shader-param";

export const shaderParams = [
    {
        "name": "%compilewater",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "*[Compiled]* Makes the brush water.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Other"
    },
    {
        "name": "%compileclip",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "*[Compiled]* Makes the brush a clip. Blocks players, and NPCS but **not physics objects**.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/%25compileclip"
    },
    {
        "name": "%compiledetail",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "*[Compiled]* Any brush using this material will be made func_detail.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/%25compiledetail"
    },
    {
        "name": "%compileladder",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "*[Compiled]* Makes this brush climbable.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/%25compileladder"
    },
    {
        "name": "%compilenodraw",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "*[Compiled]* The material will not be drawn.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/%25compilenodraw"
    },
    {
        "name": "%compilenolight",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "*[Compiled]* Skip compiling lightmaps for this material. Useful for solid black or self-illuminating materials.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/%25compilenolight"
    },
    {
        "name": "%compilenonsolid",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "*[Compiled]* A brush with this material will not have collision.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/%25compilenonsolid"
    },
    {
        "name": "%compilenpcclip",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "*[Compiled]* Makes the brush an NPC clip. Only NPCs collide with this brush. (Note that Portal 2 security cameras and turrets are NPCs)",
        "wikiUri": "https://developer.valvesoftware.com/wiki/%25compilenpcclip"
    },
    {
        "name": "%compilepassbullets",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "*[Compiled]* Allows guns to shoot straight through the brush. Useful for grates or foliage",
        "wikiUri": "https://developer.valvesoftware.com/wiki/%25compilepassbullets"
    },
    {
        "name": "%compileskip",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "*[Compiled]* VBSP will not compile faces using this material. Be careful.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/%25compileskip"
    },
    {
        "name": "%compileteam",
        "type": "int",
        "defaultCompletion": 1,
        "description": "*[Compiled]* Compilation modifiers only affect a specific team.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/%25compileteam"
    },
    {
        "name": "%compiletrigger",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "*[Compiled]* Allows the material to be used for triggers.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/%25compiletrigger"
    },
    {
        "name": "%keywords",
        "type": "string",
        "description": "Comma separated list used in Hammer's keyword filter.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/%25keywords"
    },
    {
        "name": "%notooltexture",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Hides the material from Hammer's texture browser",
        "wikiUri": "https://developer.valvesoftware.com/wiki/%25notooltexture"
    },
    {
        "name": "%noportal",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Compile time parameter to mark this surface as non-portalable. Unnecessary on models.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Controlling_portals"
    },
    {
        "name": "%tooltexture",
        "type": "texture",
        "defaultCompletion": 1,
        "description": "Defines a texture to use as the thumbnail in Hammer's texture browser",
        "wikiUri": "https://developer.valvesoftware.com/wiki/%25tooltexture"
    },
    {
        "name": "$allowdiffusemodulation",
        "type": "bool",
        "defaultCompletion": 1
    },
    {
        "name": "$alpha",
        "type": "scalar"
    },
    {
        "name": "$alphatest",
        "type": "bool",
        "defaultCompletion": 1
    },
    {
        "name": "$ambientocclusion",
        "type": "scalar"
    },
    {
        "name": "$basetexture",
        "type": "texture",
        "description": "The base color texture to use. Also called albedo/diffuse map. On water, this is used as a 'sludge layer'.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$basetexture"
    },
    {
        "name": "$blendmodulatetexture",
        "type": "texture"
    },
    {
        "name": "$blendtintbybasealpha",
        "type": "bool"
    },
    {
        "name": "$bumpmap",
        "type": "texture",
        "description": "Defines the bump map to use. Despite the name, this actually represents a 3D normal map rather than a 1D height map. \n\nThe [PBR](https://docs.momentum-mod.org/guide/pbr-shader/) shader uses the alpha channel as a height map for parallax occlusion mapping.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Bump_map"
    },
    {
        "name": "$bumptransform",
        "type": "string"
    },
    {
        "name": "$burning",
        "type": "bool"
    },
    {
        "name": "$color",
        "type": "color"
    },
    {
        "name": "$color2",
        "type": "color"
    },
    {
        "name": "$decal",
        "type": "bool",
        "defaultCompletion": 1,
        "wikiUri": "https://developer.valvesoftware.com/wiki/Decals",
        "description": "Marks the material to be used as an overlay or decal. With this on, this material no longer seals the map and hammer properly displays it in the 3D viewport without Z-fighting"
    },
    {
        "name": "$decalscale",
        "type": "float",
        "defaultCompletion": 0.25,
        "wikiUri": "https://developer.valvesoftware.com/wiki/Decals",
        "description": "Scale of the texture when applying to surface. Usually 0.25. Same as brush face texture scale."
    },
    {
        "name": "$modelmaterial",
        "type": "material",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Decals",
        "description": "Path to a separate material to use when this decal is applied to a model"
    },
    {
        "name": "$decalfadeduration",
        "type": "float",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Decals",
        "description": "Amount of time to spend fading out. Required `$vertexcolor`"
    },
    {
        "name": "$decalfadetime",
        "type": "float",
        "defaultCompletion": 1,
        "wikiUri": "https://developer.valvesoftware.com/wiki/Decals",
        "description": "Delay before fade out begins"
    },
    {
        "name": "$decalsecondpass",
        "type": "bool",
        "defaultCompletion": 1,
        "wikiUri": "https://developer.valvesoftware.com/wiki/Decals",
        "description": "Always render this decal on top of materials that don't have this parameter."
    },
    {
        "name": "$fogscale",
        "type": "float",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Decals",
        "description": "Scales the amount of fog affecting the decal. Usefog for making important decals stand out in foggy levels."
    },
    {
        "name": "$decaltexture",
        "type": "texture"
    },
    {
        "name": "$detail",
        "type": "texture",
        "description": "Specifies a texture which should be laid over the `$basetexture` when the camera is close up.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$detail"
    },
    {
        "name": "$detailscale",
        "type": "float",
        "defaultCompletion": 1,
        "description": "Scale of the detail texture.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$detail"
    },
    {
        "name": "$detailblendfactor",
        "type": "scalar",
        "description": "How much the detail texture affects the `$basetexture`, like opacity.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$detail"
    },
    {
        "name": "$detailblendmode",
        "type": "int",
        "description": "The detail blend mode to use.\n\n| ID | Blend Mode |\n| --- | --- |\n| 0 | Decal Modulate |\n| 1 | Additive |\n| 2 | Translucent Detail |\n| 3 | Blend Factor Fade |\n| 4 | Translucent Base |\n| 5 | Unlit Additive |\n| 6 | Unlit Additive Threshold Fade |\n| 7 | Two-Pattern DecalModulate |\n| 8 | Multiply |\n| 9 | Base Mask via Detail Alpha |\n| 10 | Self-Shadowed Bumpmap |\n| 11 | SSBump Albedo |",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$detail"
    },
    {
        "name": "$displacementmap",
        "type": "texture"
    },
    {
        "name": "$distancealpha",
        "type": "bool"
    },
    {
        "name": "$emissiveblendenabled",
        "type": "bool",
        "defaultCompletion": 1
    },
    {
        "name": "$emissiveblendtexture",
        "type": "texture"
    },
    {
        "name": "$emissiveblendbasetexture",
        "type": "texture"
    },
    {
        "name": "$emissiveblendflowtexture",
        "type": "texture"
    },
    {
        "name": "$emissiveblendtint",
        "type": "color"
    },
    {
        "name": "$emissiveblendscrollvector",
        "type": "matrix"
    },
    {
        "name": "$envmap",
        "type": "env_cubemap",
        "defaultCompletion": "env_cubemap",
        "description": "Defines the texture to represent reflections on this material. Use *env_cubemap* to use the nearest cubemap.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$envmap"
    },
    {
        "name": "$envmapcontrast",
        "type": "scalar"
    },
    {
        "name": "$envmapframe",
        "type": "int"
    },
    {
        "name": "$envmapmask",
        "type": "texture"
    },
    {
        "name": "$envmapmaskframe",
        "type": "int"
    },
    {
        "name": "$envmapmaskscale",
        "type": "float"
    },
    {
        "name": "$envmapmasktransform",
        "type": "string"
    },
    {
        "name": "$envmapsaturation",
        "type": "scalar"
    },
    {
        "name": "$envmaplightscale",
        "type": "scalar"
    },
    {
        "name": "$envmaptint",
        "type": "color"
    },
    {
        "name": "$normalmapalphaenvmapmask",
        "type": "bool"
    },
    {
        "name": "$halflambert",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Enables half-lambertian lighting, which wraps lighting further around a model.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$halflambert"
    },
    {
        "name": "$ignorez",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Makes the material always appear on top of everything else. Only really used for user-interfaces.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$ignorez"
    },
    {
        "name": "$lightwarptexture",
        "type": "texture"
    },
    {
        "name": "$masks1",
        "type": "texture"
    },
    {
        "name": "$masks2",
        "type": "texture"
    },
    {
        "name": "$maxfogdensityscalar",
        "type": "scalar"
    },
    {
        "name": "$model",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Marks the material to be used for models rather than brushes. Also hides it from Hammer's texture browser.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$model_(VMT)"
    },
    {
        "name": "$layertint1",
        "type": "color"
    },
    {
        "name": "$layertint2",
        "type": "color"
    },
    {
        "name": "$nocull",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Disables culling on this material to show the material on both sides of a face.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$nocull"
    },
    {
        "name": "$nodecal",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Prevents decals like bullet holes to appear on the material.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$nodecal"
    },
    {
        "name": "$nofog",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Stops the material from rendering into fog. Used typically for 2D skyboxes.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$nofog"
    },
    {
        "name": "$normalmap",
        "type": "texture",
        "description": "Defines the normal map to use. Same as `$bumpmap`. \n\nThe [PBR](https://docs.momentum-mod.org/guide/pbr-shader/) shader uses the alpha channel as a height map for parallax occlusion mapping.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Bump_map"
    },
    {
        "name": "$notint",
        "type": "bool",
        "description": "Prevents the material from getting tinted by the prop's `rendercolor` or `$color2`.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$notint"
    },
    {
        "name": "$phong",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Enables Phong shading",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$phong"
    },
    {
        "name": "$phongexponent",
        "type": "float"
    },
    {
        "name": "$phongexponenttexture",
        "type": "texture"
    },
    {
        "name": "$phongboost",
        "type": "float"
    },
    {
        "name": "$phongfresnelranges",
        "type": "matrix"
    },
    {
        "name": "$forcephong",
        "type": "bool"
    },
    {
        "name": "$invertphongmask",
        "type": "bool"
    },
    {
        "name": "$phongdisablehalflambert",
        "type": "bool"
    },
    {
        "name": "$phongwarptexture",
        "type": "texture"
    },
    {
        "name": "$phongtint",
        "type": "color"
    },
    {
        "name": "$phongalbedoboost",
        "type": "float"
    },
    {
        "name": "$phongmaskcontrastbrightness",
        "type": "matrix"
    },
    {
        "name": "$phongmaskcontrastbrightness2",
        "type": "matrix"
    },
    {
        "name": "$phongamount",
        "type": "colora"
    },
    {
        "name": "$phongamount2",
        "type": "colora"
    },
    {
        "name": "$phongbasetint",
        "type": "float"
    },
    {
        "name": "$phongbasetint2",
        "type": "float"
    },
    {
        "name": "$pointsamplemagfilter",
        "type": "bool"
    },
    {
        "name": "$reflectivity",
        "type": "color"
    },
    {
        "name": "$rimlight",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Enables rim-lighting. Requires `$phong 1`.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$rimlight"
    },
    {
        "name": "$rimlightexponent",
        "type": "int",
        "description": "Exponent for phong component of rim lighting. The rim exponent defines the 'tightness' of the highlight. A higher exponent results in a smaller, tighter highlight while a lower exponent results in a broader flatter one.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$rimlight#Additional_parameters"
    },
    {
        "name": "$rimlightboost",
        "type": "float",
        "description": "Boost for ambient cube component of rim lighting.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$rimlight#Additional_parameters"
    },
    {
        "name": "$rimmask",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Uses the alpha channel of the $phongexponenttexture to mask rimlighting.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$rimlight#Additional_parameters"
    },
    {
        "name": "$fresnelrangestexture",
        "type": "texture"
    },
    {
        "name": "$metalness",
        "type": "float"
    },
    {
        "name": "$seamless_scale",
        "type": "float"
    },
    {
        "name": "$ssbump",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Enables self-shadowing of the bumpmap. \nTip: You can use `height2ssbump.exe` to generate this map.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$ssbump"
    },
    {
        "name": "$ssbumpmathfix",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Modifies the amount of light received",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$ssbump"
    },
    {
        "name": "$surfaceprop",
        "type": "string",
        "description": "Sets the physical surface properties to use for this material. This affects sounds and physics like mass and buoyancy.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$surfaceprop"
    },
    {
        "name": "$tintmasktexture",
        "type": "texture"
    },
    {
        "name": "$translucent",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Makes the texture partially see-through. \nDisables projected texture shadow casting and can cause depth sorting problems.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$translucent"
    },
    {
        "name": "$treeSway",
        "type": "int",
        "defaultCompletion": 1,
        "description": "Enables the tree-sway effect, which morphs the material according to the level's env_wind to emulate wind blowing through leaves.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$treeSway"
    },
    {
        "name": "$writez",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Used on the `DecalModulate` shader to force the material to write into z-buffer.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/$writeZ"
    },
    {
        "name": "$mraotexture",
        "type": "texture",
        "description": "Used in the PBR shader to represent **M**etallic, **R**oughness and **A**mbient **O**cclusion maps. \n\nRed: Metallic \n\nGreen: Roughness \n\nBlue: Ambient Occlusion",
        "wikiUri": "https://docs.momentum-mod.org/guide/pbr-shader/#manual-mrao-creation-in-photoshop-channel-packing"
    },
    {
        "name": "$abovewater",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Whether this material is used for above or below the water’s surface.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)"
    },
    {
        "name": "$bottommaterial",
        "type": "material",
        "description": "**Required parameter.** This is the material (not texture) to use when underneath the water’s surface. The bottom material must have $reflecttexture, `$abovewater` and `$envmap` disabled, but can otherwise do whatever it wants.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)"
    },
    {
        "name": "$underwateroverlay",
        "type": "material",
        "description": "Applies a refracting screen overlay when the camera is underwater. Generally used with `effects/water_warp01`. Requires `$abovewater` to be 0.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)"
    },
    {
        "name": "$waterdepth",
        "type": "float",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)"
    },
    {
        "name": "$water_feather",
        "type": "int",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)"
    },
    {
        "name": "$fogenable",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Enables volumetric fog for the water.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)"
    },
    {
        "name": "$fogcolor",
        "type": "color",
        "defaultCompletion": "[1 1 1]",
        "description": "Color of the water's volumetric fog. Should match the color used in the `$bottommaterial`",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)"
    },
    {
        "name": "$fogstart",
        "type": "float",
        "defaultCompletion": 0,
        "description": "Amount of units from the camera that the fog starts. **Warning: Must be 0 for edge fading to work properly.**",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)"
    },
    {
        "name": "$fogend",
        "type": "float",
        "description": "Amount of units from the camera that the fog ends.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)"
    },
    {
        "name": "$lightmapwaterfog",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Allows the fog to receive lightmaps, so that static objects can cast shadows onto the water. This must be enabled when the map is compiled.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)"
    },
    {
        "name": "$reflecttexture",
        "type": "texture",
        "defaultCompletion": "_rt_WaterReflection",
        "description": "Texture to use for reflection. For real-time reflections, use _rt_WaterReflection.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$reflectamount",
        "type": "float",
        "description": "Amount of warp for the reflection. Higher values produce more visible reflections.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$reflecttint",
        "type": "color",
        "description": "Color tint for both expensive and cheap reflections.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$forceenvmap",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Forces the water to use `$envmap` for reflections.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$forcecheap",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Force the water to render itself as cheap, regardless of the map's `water_lod_control` entity settings or the user's settings. This will disable real-time reflection and instead use `$envmap`. Refraction is assumed to be opaquely the water fog color.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$forceexpensive",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Force the water to render itself as expensive, regardless of the map's `water_lod_control` entity settings or the user's settings.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$cheapwaterstartdistance",
        "type": "float",
        "description": "Distance from the eye in inches that the shader should start transitioning to a cheaper water shader.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$cheapwaterenddistance",
        "type": "float",
        "description": "Distance from the eye in inches that the shader should finish transitioning to a cheaper water shader.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$reflectentities",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Make the water reflect entities. By default, no entities are ever reflected.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$reflectonlymarkedentities",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Make the water reflect only entities and static props with `Render in Fast Reflections` enabled.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$reflectskyboxonly",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Make the water reflect only the skybox.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$reflect2dskybox",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Make the water reflect the skybox material in addition to other reflections.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$reflect3dskybox",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Make the water reflect the 3D skybox in addition to other reflections. **Requires a `sky_camera` in the map.**",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$reflectblendfactor",
        "type": "float",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$nofresnel",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Disable the fresnel on the water's reflection.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$forcefresnel",
        "type": "float",
        "description": "Force this amount of fresnel on the water. Higher values usually cause the water to appear brighter. ",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$basereflectance",
        "type": "float",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$maxreflectance",
        "type": "float",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Reflection"
    },
    {
        "name": "$refract",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Whether the water material should refract.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Refraction"
    },
    {
        "name": "$refracttexture",
        "type": "texture",
        "defaultCompletion": "_rt_WaterRefraction",
        "description": "Texture to use for refraction. For real-time refractions, use `_rt_WaterRefraction`.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Refraction"
    },
    {
        "name": "$refractamount",
        "type": "float",
        "description": "Amount of warp for the refraction. Higher values produce more warping.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Refraction"
    },
    {
        "name": "$refracttint",
        "type": "color",
        "description": "Color of the refraction.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Refraction"
    },
    {
        "name": "$blurrefract",
        "type": "bool",
        "description": "Blurs the refraction when underwater. **Only use on materials with `$abovewater 1`",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Refraction"
    },
    {
        "name": "$pseudotranslucent",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Make the water translucent. This is a cheap substitute for refractive water; do not use this when refraction is enabled.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Refraction"
    },
    {
        "name": "$waterblendfactor",
        "type": "scalar",
        "description": "How translucent the water should be when $pseudotranslucent is enabled. At 0, the water is completely transparent, while at 1 the water is completely opaque.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Refraction"
    },
    {
        "name": "$scroll1",
        "type": "string",
        "description": "Used for flowing water that don't use a flowmap. Refer to the wiki.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Flowing_water"
    },
    {
        "name": "$scroll2",
        "type": "string",
        "description": "Used for flowing water that don't use a flowmap. Refer to the wiki.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Flowing_water"
    },
    {
        "name": "$flowmap",
        "type": "texture",
        "description": "Texture that defines flow velocity by skewing and scrolling the `$normalmap`",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Flowing_water"
    },
    {
        "name": "$flow_normaluvscale",
        "type": "float",
        "description": "The number of world units covered by the normal map before it repeats. Typically in the 100s.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Flowing_water"
    },
    {
        "name": "$flow_worlduvscale",
        "type": "float",
        "description": "The number of times the flow map fits into the material. Face texture scale affects this.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Flowing_water"
    },
    {
        "name": "$flow_uvscrolldistance",
        "type": "float",
        "description": "How far along the flow map the normal map should be distorted. Higher values lead to more distortion.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Flowing_water"
    },
    {
        "name": "$flow_timeintervalinseconds",
        "type": "float",
        "description": "Time needed for the normal map to cross the `$flow_uvscrolldistance`.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Flowing_water"
    },
    {
        "name": "$flow_timescale",
        "type": "float",
        "description": "Modifies flow speed without affecting the amount of distortion.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Flowing_water"
    },
    {
        "name": "$flow_bumpstrength",
        "type": "scalar",
        "description": "How rough the surface of the water is.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Flowing_water"
    },
    {
        "name": "$flow_noise_texture",
        "type": "texture",
        "description": "A treatment texture used to break up repetition of the normal map.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Flowing_water"
    },
    {
        "name": "$flow_noise_scale",
        "type": "float",
        "description": "How many times to fit the noise texture into the normal map. Typically around 0.01.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Flowing_water"
    },
    {
        "name": "$flow_debug",
        "type": "bool",
        "defaultCompletion": 0,
        "description": "Replaces the water surface with a literal rendering of the flow map. Don't rely on Hammer's view for alignment.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Water_(shader)#Flowing_water"
    },
    {
        "name": "$selfillum",
        "type": "bool",
        "defaultCompletion": 1,
        "description": "Self illumination applies 'fake' light to a surface, regardless of the true light that the surface receives from the environment.",
        "wikiUri": "https://developer.valvesoftware.com/wiki/Glowing_Textures#.24selfillum"
    }
] as ShaderParam[];
export const internalTextures = [
    "_rt_WaterReflection",
    "_rt_WaterRefraction",
    "_rt_Camera",
    "_rt_PowerOfTwoFB",
    "_rt_Fullscreen",
    "_rt_FullFrameDepth",
    "_rt_SmallHDR0",
    "_rt_SmallHDR1",
    "_rt_SmallFB0",
    "_rt_SmallFB1",
    "_rt_Shadows",
    "_rt_ShadowDummy",
    "_rt_Replay_Accum_Sample",
    "_rt_Replay_Pong",
    "_rt_LayoffResult",
    "_rt_ReplayScreenshot",
    "_rt_ResolvedFullFrameDepth",
    "_rt_Scope",
    "_rt_Portal1",
    "_rt_Portal2"
];