# MudBlazor.SimpleIcons
MudBlazor.SimpleIcons is a .NET library that provides SimpleIcons for MudBlazor.

## Information:
- Due to an error in the build script, the last updates did not contain any new features. This should now be fixed and all new icons should be available from version 1.6.0. 

## Installation

You can install the package via Nuget:

```sh
dotnet add package Json_exe.MudBlazor.SimpleIcons
```

## Usage
After installing the package, you can use it in your project like this:

```csharp
using Json_exe.MudBlazor.SimpleIcons;

<MudIcon Icon="@SimpleIcons.SiDotnet" />
```

## Features
- Featuring all Icons from SimpleIcons
- No additional dependencies
- Icons come with License information, if available, compiled as comment
- Icons also come with the default color in hex format, compiled as comment

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Roadmap
- [ ] Write a SourceGenerator to reduce the size of the library (if possible)
